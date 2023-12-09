// noinspection TypeScriptValidateTypes

import { defineNuxtConfig } from 'nuxt/config'
import { BASE_URL } from './data';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        baseURL: BASE_URL,
    },
    runtimeConfig: {
        baseURL: BASE_URL,
    },
    modules: ['@nuxtjs/tailwindcss'],
    build: {
        vendor: ['lodash.debounce'],
    },
});
