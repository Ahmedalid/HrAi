// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translations.json';
import translationAR from './ar/translations.json';

let currentLanguage = localStorage.getItem('language') || 'ar';

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: currentLanguage,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export function changeLanguage(newLanguage) {
  // console.log('Changing language to:', newLanguage);

  if (resources[newLanguage]) {
    currentLanguage = newLanguage;
    localStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);

    // Set text direction based on the language
    if (newLanguage === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }
}

export default i18n;

// Set the default language to Arabic
changeLanguage(currentLanguage);
