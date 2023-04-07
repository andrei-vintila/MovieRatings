// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindForms from "@tailwindcss/forms";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon"],
  ssr: false,
  appConfig: {
    OMDB_API_KEY: "e469f901",
    OMDB_API_URL: "http://www.omdbapi.com/",
  },
  tailwindcss: {
    config: {
      plugins: [tailwindForms],
    },
  },
});
