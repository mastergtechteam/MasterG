// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import AppText from '../common/AppText';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const AlertStrip = ({ onPress }) => {
//   return (
//     <View style={styles.container}>
//       {/* Left section */}
//       <View style={styles.left}>
//         <View style={styles.iconWrapper}>
//           <Ionicons name="warning-outline" size={16} color="#facc15" />
//         </View>

//         <AppText style={styles.text}>
//           Cooking Oil prices may{'\n'}increase in 5 days
//         </AppText>
//       </View>

//       {/* Right button */}
//       <TouchableOpacity style={styles.button} onPress={onPress}>
//         <AppText style={styles.buttonText}>Pre-Book</AppText>
//         <Ionicons name="chevron-forward" size={14} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AlertStrip;
// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//     backgroundColor: '#1c1c12',
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#5c4a14',
//   },

//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 10,
//   },

//   iconWrapper: {
//     width: 28,
//     height: 28,
//     borderRadius: 6,
//     backgroundColor: '#2a240a',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },

//   text: {
//     color: '#fff',
//     fontSize: 13,
//     lineHeight: 18,
//     fontWeight: '500',
//   },

//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ea580c',
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 999,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//     marginRight: 4,
//   },
// });
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../common/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlertStrip = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Left content */}
        <View style={styles.left}>
          <View style={styles.iconWrapper}>
            <Ionicons name="warning-outline" size={16} color="#facc15" />
          </View>

          <AppText style={styles.text}>
            Cooking Oil prices may{'\n'}increase in 5 days
          </AppText>
        </View>

        {/* Right button */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <AppText style={styles.buttonText}>Pre-Book</AppText>
          <Ionicons name="chevron-forward" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlertStrip;
const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 20,
    position: 'relative',
  },

  container: {
    backgroundColor: '#1c1c12',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingLeft: 18, // space for left border
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#5c4a14',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#2a240a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  text: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ea580c',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
});
