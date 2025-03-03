// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-mongoose', '@nuxt/eslint'],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
    },
    modelsDir: 'models',
    devtools: true,
  },
})