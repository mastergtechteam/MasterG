import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../screens/Cart/styles';

const ExpandableSection = ({
  title,
  icon,
  section,
  expandedSections,
  toggleSection,
  children,
}) => {
  const isExpanded = expandedSections[section];

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section)}
      >
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionIconBox}>{icon}</View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>

        <MaterialIcons
          name={isExpanded ? 'expand-less' : 'expand-more'}
          size={24}
        />
      </TouchableOpacity>

      {isExpanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};

export default ExpandableSection;
