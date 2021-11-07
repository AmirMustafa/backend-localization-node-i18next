const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

// Localization config
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./localization/{{lng}}/translation.json",
    },
  });

module.exports = { i18next, middleware };
