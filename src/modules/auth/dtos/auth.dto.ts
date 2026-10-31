export interface LoginCredentials {
    username?: string;
    email?: string;
    app_key: string;
}

export interface AuthUserDto {
    id: string;
    username?: string;
    email?: string;
    name: string;
    role: 'ADMIN' | 'CASHIER' | 'AUDIT';
}