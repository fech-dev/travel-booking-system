export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/test-utils/module", "@nuxtjs/tailwindcss"],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },

  css: ["~/assets/css/theme.css"],

  runtimeConfig: {
    databaseName: "",
  },
});
