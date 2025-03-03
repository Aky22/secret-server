import {createIV, createHash, encrypt} from "~/server/utils/criptoUtil";
import {SecretResponseDto} from "~/server/dtos/SecretResponseDto";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const iv = createIV();
    const hash = createHash(body.secret);
    const plainTextSecret = body.secret;
    body.secret = encrypt(hash, body.secret, iv);
    body.createdAt = new Date();
    body.hash = hash.toString('hex');
    body.iv = iv.toString('hex');
    body.viewed = 0;
    try {
        const data = await Secret.insertOne(body);
        return new SecretResponseDto(
            data.hash,
            plainTextSecret,
            body.createdAt,
            body.expireAfter,
            body.expireAfterViews
        )
    }
    catch (error) {
        return error
    }
})