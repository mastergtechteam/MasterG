// import i18n from '../localization/i18n';

// export const useTranslation = () => {
//   const t = (key, options) => i18n.t(key, options);
//   return { t };
// };
import i18n from '../localization/i18n';
import { useLanguageContext } from '../context/LanguageContext';

export const useTranslation = () => {
  const { language } = useLanguageContext(); // subscribe

  const t = key => i18n.t(key);

  return { t, language };
};
