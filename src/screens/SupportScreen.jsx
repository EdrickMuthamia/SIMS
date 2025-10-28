import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Modal, TextInput, Alert, Platform } from 'react-native';
import colors from '../styles/colors.jsx';

export default function SupportScreen() {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleContact = (type) => {
    if (type === 'email') {
      Linking.openURL('mailto:support@example.com');
    } else if (type === 'phone') {
      Linking.openURL('tel:+1234567890');
    }
  };

  const handleLiveChat = () => {
    setIsChatModalVisible(true);
  };

  const handleSendChat = () => {
    if (chatMessage.trim()) {
      Alert.alert('Message Sent', 'Your message has been sent to support.');
      setChatMessage('');
      setIsChatModalVisible(false);
    } else {
      Alert.alert('Error', 'Please enter a message.');
    }
  };

  const handleHelpResource = (type) => {
    if (type === 'faq') {
      Linking.openURL('https://example.com/faq');
    } else if (type === 'guide') {
      Linking.openURL('https://example.com/user-guide');
    } else if (type === 'tutorials') {
      Linking.openURL('https://example.com/video-tutorials');
    }
  };

  const handleRateApp = () => {
    const storeUrl = Platform.OS === 'ios' ? 'https://apps.apple.com/app/your-app-id' : 'https://play.google.com/store/apps/details?id=com.yourapp';
    Linking.openURL(storeUrl);
  };

  const handleSendFeedback = () => {
    Linking.openURL('mailto:feedback@example.com?subject=App Feedback');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HELP & SUPPORT</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleContact('email')}>
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleContact('phone')}>
          <Text style={styles.buttonText}>Call Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLiveChat}>
          <Text style={styles.buttonText}>Live Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help Resources</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleHelpResource('faq')}>
          <Text style={styles.buttonText}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleHelpResource('guide')}>
          <Text style={styles.buttonText}>User Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleHelpResource('tutorials')}>
          <Text style={styles.buttonText}>Video Tutorials</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feedback</Text>

        <TouchableOpacity style={styles.button} onPress={handleRateApp}>
          <Text style={styles.buttonText}>Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
          <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isChatModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsChatModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Live Chat</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message..."
              value={chatMessage}
              onChangeText={setChatMessage}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSendChat}>
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsChatModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerText: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: { padding: 20 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: colors.text,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontSize: 16 },
});
