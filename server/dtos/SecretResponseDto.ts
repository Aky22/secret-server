export class SecretResponseDto {
    hash: string;
    secretText: string;
    createdAt: Date;
    expiresAt: Date | string;
    remainingViews: number;

    constructor(hash: string, secretText: string, createdAt: Date, expiresAfter: Date | string, remainingViews: number) {
        this.hash = hash;
        this.secretText = secretText;
        this.createdAt = createdAt;
        this.expiresAt = expiresAfter === 0 ? 'never' : new Date(createdAt.getTime() + (expiresAfter * 60000));
        this.remainingViews = remainingViews;
    }
}