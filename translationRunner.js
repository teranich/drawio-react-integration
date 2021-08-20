const manageTranslations = require('react-intl-translations-manager').default

manageTranslations({
  messagesDirectory: './src/translations/extracted/',
  translationsDirectory: './src/translations/locales/',
  languages: ['en', 'ru'],
})
