import {decrypt} from "~/server/utils/criptoUtil";
import {SecretResponseDto} from "~/server/dtos/SecretResponseDto";

export default defineEventHandler(async (event) => {
    const data = await Secret.findOne({ hash: event.context.params?.hash });
    if(data.viewed === data.expireAfterViews) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Secret has been viewed the maximum number of times'
        });
    }

    if((new Date(data.createdAt.getTime() + (data.expireAfter * 60000)).valueOf() < new Date().valueOf()) && data.expireAfter !== 0 ) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Secret has expired'
        });
    }

    await Secret.updateOne({ hash: event.context.params?.hash }, { viewed: data.viewed + 1 });
    const secret = decrypt(Buffer.from(data.hash, 'hex'), data.secret, Buffer.from(data.iv, 'hex'));
    return new SecretResponseDto(
        data.hash,
        secret,
        data.createdAt,
        data.expireAfter,
        data.expireAfterViews - (data.viewed + 1));
});