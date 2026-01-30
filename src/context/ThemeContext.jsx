// import React, { createContext, useContext, useState } from 'react';
// import { lightTheme, darkTheme } from '../theme';

// const ThemeContext = createContext(null); // <- NO <any>

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(false);

//   const theme = isDark ? darkTheme : lightTheme;

//   const toggleTheme = () => setIsDark(prev => !prev);

//   return (
//     <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeContext = () => useContext(ThemeContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // 'light' | 'dark'
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => listener.remove();
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
