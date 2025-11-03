import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ReportProblem() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!subject || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Simulate submission
    console.log('Problem reported:', { subject, description });
    Alert.alert('Success', 'Your report has been submitted. Thank you!');
    router.push('/settings/help');
  };

  const handleBack = () => {
    router.push('/settings/help');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <Image source={require('../../assets/icons/go-back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>REPORT A PROBLEM</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor="#CCCCCC"
            value={subject}
            onChangeText={setSubject}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the problem"
            placeholderTextColor="#CCCCCC"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.7}>
            <Text style={styles.buttonText}>SUBMIT REPORT</Text>
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
  input: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    height: 120,
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
