// import { I18n } from 'i18n-js';
// import * as RNLocalize from 'react-native-localize';

// import en from './en';
// import hi from './hi';

// const i18n = new I18n({
//   en,
//   hi,
// });

// // fallback if language not found
// i18n.enableFallback = true;

// // detect system language
// const locales = RNLocalize.getLocales();
// if (locales.length > 0) {
//   i18n.locale = locales[0].languageCode;
// }

// export default i18n;
import { I18n } from 'i18n-js';
import * as Localization from 'react-native-localize';

import en from './en';
import hi from './hi';

const i18n = new I18n({
  en,
  hi,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// IMPORTANT
const deviceLanguage = Localization.getLocales()[0]?.languageCode;
i18n.locale = deviceLanguage || 'en';

export default i18n;
