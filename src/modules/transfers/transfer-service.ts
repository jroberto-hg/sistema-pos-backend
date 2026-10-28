import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TRANSFER_REPOSITORY } from "./repositories/transfer.repository.js";
import type { TransferRepository } from "./repositories/transfer.repository.js"
import { PosSocketAdapter } from "../../commons/events/adapters/pos-socket.adapters.js";
import { DataSource } from "typeorm";
import { Transfer, TransferStatus } from "./entities/transfer.entity.js";
import { TransferDto } from "./dtos/transfer.dto.js";
import { Warehouse } from "../warehouse/entities/warehouse.entity.js";
import { TransferDetail } from "./entities/transfer-details.js";
import { InventoryStock } from "../inventory/entities/inventory-stock.entity.js";

@Injectable()
export class TransferService { 
    constructor(
        @Inject(TRANSFER_REPOSITORY)
        private readonly transferRepository: TransferRepository,
        private readonly posSocketAdapter: PosSocketAdapter,
        private readonly dataSource: DataSource,
    ) { }

    async findAll(): Promise<Transfer[]> {
        return await this.transferRepository.findAll();
    }

    async findById(id: number): Promise<Transfer> {
        const transfer = await this.transferRepository.findById(id);

        if (!transfer) {
            throw new NotFoundException(`La transferencia con ID ${id} no fue encontrada`);
        }

        return transfer;
    }

    async create(dto: TransferDto): Promise<Transfer> { 
        const { origin_warehouse_id, destination_warehouse_id, notes, details } = dto;

        if (origin_warehouse_id === destination_warehouse_id) {
            throw new BadRequestException('El almacén de origen y destino no pueden ser el mismo');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const originWarehouse = await queryRunner.manager.findOne(Warehouse, { where: { id: origin_warehouse_id } });
            const destWarehouse = await queryRunner.manager.findOne(Warehouse, { where: { id: destination_warehouse_id } });

            if (!originWarehouse || !destWarehouse) {
                throw new NotFoundException('El almacén de origen o destino no existe');
            }

            const transferDetails: TransferDetail[] = [];
            for (const item of details) { 
                // 1. Verificar stock en el almacén de Origen
                let originInventory = await queryRunner.manager.findOne(InventoryStock, {
                    where: { warehouse_id: origin_warehouse_id, product_id: item.product_id },
                });

                if (!originInventory || Number(originInventory.stock) < Number(item.quantity)) {
                    throw new BadRequestException(`Stock insuficiente en el almacén de origen para el producto ID ${item.product_id}`);
                }

                // Descontar del origen
                originInventory.stock = Number(originInventory.stock) - Number(item.quantity)
                await queryRunner.manager.save(originInventory);

                 // 2. Obtener o crear stock en el almacén de Destino
                let destStock = await queryRunner.manager.findOne(InventoryStock, {
                    where: { warehouse_id: destination_warehouse_id, product_id: item.product_id },
                });

                if (!destStock) {
                    destStock = queryRunner.manager.create(InventoryStock, {
                        warehouse_id: destination_warehouse_id,
                        product_id: item.product_id,
                        stock: 0,
                    });
                }

                // Sumar al destino
                destStock.stock = Number(destStock.stock) + Number(item.quantity);
                await queryRunner.manager.save(destStock);

                // 3. Registrar detalle de transferencia
                const detail = new TransferDetail();
                detail.product_id = item.product_id;
                detail.quantity = item.quantity;
                transferDetails.push(detail);
            }

            // Crear la entidad Transfer principal utilizando el repositorio o el manager
            const transfer = new Transfer();
            transfer.origin_warehouse_id = origin_warehouse_id;
            transfer.destination_warehouse_id = destination_warehouse_id;
            transfer.notes = notes ?? null;
            transfer.status = TransferStatus.COMPLETED;
            transfer.details = transferDetails;

            const savedTransfer = await queryRunner.manager.save(Transfer, transfer);
            await queryRunner.commitTransaction();

            // Emitir evento por WebSockets
            this.posSocketAdapter.emitEvent('inventory:transferred', savedTransfer);
            return savedTransfer;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(`Error en la transferencia: ${error}`);
        } finally {
            await queryRunner.release();
        }
    }
}