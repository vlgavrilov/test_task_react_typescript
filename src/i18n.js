import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: {
    translation: {
      balance: 'Баланс',
      payout: 'Выплата',
      reset: 'Сбросить',
      promocode: 'Промокод',
      services: 'Сервисы',
      filter: 'ФИЛЬТР',
      Activated: 'Активировано!',
      'activate bonus': 'Активировать бонус',
      copied: 'Скопировано',
      'no services found': 'Сервисов не найдено',

    },
  },
  en: {
    translation: {
      balance: 'Balance',
      payout: 'Payout',
      reset: 'Reset',
      promocode: 'Promocode',
      services: 'Services',
      filter: 'FILTER',
      Activated: 'Activated!',
      'activate bonus': 'Activate bonus',
      copied: 'Copied',
      'no services found': 'No services found',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({

    // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
    cookieOptions: { path: '/', sameSite: 'strict' },
    resources,

    keySeparator: false, // we do not use keys in form messages.welcome
    initialLanguage: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
