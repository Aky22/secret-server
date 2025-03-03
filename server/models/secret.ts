import { defineMongooseModel } from '#nuxt/mongoose'

export const Secret = defineMongooseModel({
    name: 'secret',
    schema: {
        hash: {
            type: 'string',
            required: true,
        },
        secret: {
            type: 'string',
            required: true,
        },
        createdAt: {
            type: 'Date',
            required: true,
        },
        expireAfter: {
            type: 'Number',
            required: true,
        },
        expireAfterViews: {
            type: 'Number',
            required: true,
        },
        iv: {
            type: 'string',
            required: true,
        },
        viewed: {
            type: 'Number',
            required: true,
        }
    },
})