// import React, { createContext, useContext, useState } from 'react';
// import i18n from '../localization/i18n';

// const LanguageContext = createContext(null);

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState(i18n.locale);

//   const changeLanguage = lang => {
//     i18n.locale = lang;
//     setLanguage(lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguageContext = () => useContext(LanguageContext);
import React, { createContext, useContext, useState } from 'react';
import i18n from '../localization/i18n';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);

  const changeLanguage = lang => {
    i18n.locale = lang; // update i18n
    setLanguage(lang); // force re-render
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
