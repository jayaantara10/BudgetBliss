// i18n.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize'; // Import react-native-localize

// Importing translation files
import en from '../../../assets/locales/en.json';
import id from '../../../assets/locales/id.json';

// Get the current device language
const {languageCode} = RNLocalize.getLocales()[0];

// Configuring i18next
i18n
  .use(initReactI18next) // Use initReactI18next
  .init({
    compatibilityJSON: 'v3', // Compatibility for older JSON structures
    lng: languageCode, // Use device language as default language
    fallbackLng: 'en', // Fallback language
    resources: {
      en: {
        translation: en,
      },
      id: {
        translation: id,
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
