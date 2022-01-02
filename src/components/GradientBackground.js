import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet } from 'react-native';

const GradientBackground = ({children}) => {
  return (
    <LinearGradient style={styles.container}
      colors={['#485461','#28313b']}
      start={{
        x: 0,
        y: 0
      }}
      end={{
        x: 1,
        y: 1
      }}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default GradientBackground