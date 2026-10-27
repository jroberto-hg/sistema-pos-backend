import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'pos_db',
    autoLoadEntities: true,
    synchronize: true,

    // Configuracion avanzada del Pool de Conexiones
    poolSize: 10,
    extra: {
        max: 20,                        // Límite máximo absoluto de conexiones en el pool
        idleTimeoutMillis: 30000,       // Tiempo (en ms) que una conexión inactiva se mantiene abierta antes de cerrarse
        connectionTimeoutMillis: 2000,  // Tiempo máximo de espera para obtener una conexión del pool antes de dar error
    },
});