import AsyncStorage from '@react-native-async-storage/async-storage';
import de from './de';
import en from './en';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ro from './ro';

// import * as RNLocalize from 'react-native-localize';

const LANGUAGES = {
  en,
  de,
  ro
};

const LANG_CODES = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: callback => {
      AsyncStorage.getItem('user-language', (err, language) => {
        // if error fetching stored data or no language was stored
        // display errors when in DEV mode as console statements
        if (err || !language) {
          if (err) {
            console.log('Error fetching Languages from asyncstorage ', err);
          } else {
            console.log('No language is set, choosing Romanian as fallback');
          }
         // const findBestAvailableLanguage =
         //   RNLocalize.findBestAvailableLanguage(LANG_CODES);
  
          callback('ro');
          return;
        }
        callback(language);
      });
    },
    init: () => {},
    cacheUserLanguage: language => {
      AsyncStorage.setItem('user-language', language);
    }
  };

i18n
  // detect language
  .use(LANGUAGE_DETECTOR)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // set options
  .init({
    resources: LANGUAGES,
    react: {
      useSuspense: false
    },
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false
    }
  });