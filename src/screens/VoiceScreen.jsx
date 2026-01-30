import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppSafeArea from '../components/AppSafeArea';

const VoiceScreen = () => {
  return (
    <AppSafeArea>
      <FlatList
        data={[]} // dummy data
        keyExtractor={() => 'key'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        ListHeaderComponent={
          <>
            <Header />
          </>
        }
      />
    </AppSafeArea>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({});
