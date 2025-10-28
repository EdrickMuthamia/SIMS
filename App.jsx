import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.frameContainer}>
      <ImageBackground
        source={require('./assets/icons/iphone16promax.png')}
        style={styles.frameBackground}
        resizeMode="contain"
      >
        <View style={styles.screenArea}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  frameContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameBackground: {
    width: '90%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenArea: {
    width: '85%',
    height: '88%',
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
