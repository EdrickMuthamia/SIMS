import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Terms() {
  const router = useRouter();
  const [showTerms, setShowTerms] = useState(false);

  const handleBack = () => {
    router.push('/settings/acc&settings');
  };

  const termsText = `
Welcome to SFAMS (Student Financial Aid Management System). By using this app, you agree to the following terms and conditions:

1. Acceptance of Terms: By accessing and using SFAMS, you accept and agree to be bound by the terms and conditions of this agreement.

2. Use License: Permission is granted to temporarily download one copy of SFAMS per device for personal, non-commercial transitory viewing only.

3. Disclaimer: The information on this app is provided on an 'as is' basis. SFAMS disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose and non-infringement.

4. Limitations: In no event shall SFAMS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use SFAMS.

5. Privacy Policy: Your privacy is important to us. Please review our Privacy Policy, which also governs your use of SFAMS, to understand our practices.

6. Governing Law: Any claim related to SFAMS shall be governed by the laws of the jurisdiction without regard to its conflict of law provisions.

If you do not agree to these terms, please do not use this app.
  `;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/go-back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>TERMS & CONDITIONS</Text>
      </View>
      <View style={styles.content}>
        {showTerms ? (
          <View style={styles.termsView}>
            <Text style={styles.termsText}>{termsText}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowTerms(false)} activeOpacity={0.7}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setShowTerms(true)} activeOpacity={0.7}>
              <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
              <Text style={styles.buttonText}>View Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Terms Accepted', 'You have accepted the Terms & Conditions.')} activeOpacity={0.7}>
              <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
              <Text style={styles.buttonText}>Accept Terms</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
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
  button: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  termsView: {
    flex: 1,
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FE005F',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
