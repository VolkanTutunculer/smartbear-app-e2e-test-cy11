const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});