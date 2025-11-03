import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ProfileForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (!firstName || !lastName || !mobile || !email) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Simulate submission
    console.log('Profile updated:', { firstName, lastName, mobile, email });
    router.push('/settings/profile-confirmation');
  };

  const handleBack = () => {
    router.push('/settings/acc&settings');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <Image source={require('../../assets/icons/go-back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>MY PROFILE</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#CCCCCC"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#CCCCCC"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            placeholderTextColor="#CCCCCC"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.7}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
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
  input: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FE005F',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
