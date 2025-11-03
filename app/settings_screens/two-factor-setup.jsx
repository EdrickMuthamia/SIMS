import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function TwoFactorSetup() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const handleEnable = () => {
    if (!verificationCode) {
      Alert.alert('Error', 'Please enter the verification code.');
      return;
    }
    // Simulate enabling 2FA
    console.log('2FA enabled with code:', verificationCode);
    setIsEnabled(true);
    Alert.alert('Success', 'Two-Factor Authentication has been enabled!');
    router.push('/settings/security');
  };

  const handleDisable = () => {
    // Simulate disabling 2FA
    console.log('2FA disabled');
    setIsEnabled(false);
    Alert.alert('Success', 'Two-Factor Authentication has been disabled.');
    router.push('/settings/security');
  };

  const handleBack = () => {
    router.push('/settings/security');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <Image source={require('../../assets/icons/go-back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>TWO-FACTOR AUTHENTICATION</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>
            Two-Factor Authentication adds an extra layer of security to your account. Enter the verification code from your authenticator app to enable it.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            placeholderTextColor="#CCCCCC"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity style={styles.button} onPress={handleEnable} activeOpacity={0.7}>
            <Text style={styles.buttonText}>ENABLE 2FA</Text>
          </TouchableOpacity>
          {isEnabled && (
            <TouchableOpacity style={[styles.button, styles.disableButton]} onPress={handleDisable} activeOpacity={0.7}>
              <Text style={styles.buttonText}>DISABLE 2FA</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#FE005F',
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  headerText: {
    color: '#FFFF00',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FE005F',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  disableButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
