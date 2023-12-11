// noinspection TypeScriptValidateTypes

import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        baseURL: "/midnightsmaker/",
    },
    modules: ['@nuxtjs/tailwindcss'],
    build: {
        vendor: ['lodash.debounce'],
    },
});
