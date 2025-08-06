import { createI18n } from 'vue-i18n'

const messages = {
  pl: {
    landing: "Zacznij działać",
    btnText: "Rozpocznij korzystanie z aplikacji"
  },
  en: {
    landing: "Take action.",
    btnText: "Start using the app",
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages,
})
