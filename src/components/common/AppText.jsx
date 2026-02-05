// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { useTheme } from '../../hooks/useTheme';

// const AppText = ({ children, color = 'text', style }) => {
//   const { theme } = useTheme();
//   return (
//     <View>
//       <Text style={[{ color: theme.colors.text }, style]}>{children}</Text>
//     </View>
//   );
// };

// export default AppText;

// const styles = StyleSheet.create({});
import { Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../theme/colors';

const AppText = ({ children, color = 'textPrimary', style }) => {
  const textColor =
    color === 'white' ? colors.white : colors[color] || colors.textPrimary;

  return (
    <View>
      <Text style={[{ color: textColor }, style]}>{children}</Text>
    </View>
  );
};

export default AppText;
