import * as crypto from "crypto";
import type {BinaryLike} from "crypto";
export const encrypt = (hash: string, secret: string, iv: BinaryLike) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', hash, iv);
    let encrypted = cipher.update(secret, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export const decrypt = (hash: string, secret: string, iv: BinaryLike) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', hash, iv);
    let decrypted = decipher.update(secret, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const createHash = (secret: string) => {
    return crypto.createHash('sha256').update(secret).digest();
}

export const createIV = () => {
    return crypto.randomBytes(16);
}