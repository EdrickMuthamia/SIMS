import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Modal, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Help() {
  const router = useRouter();
  const [showAbout, setShowAbout] = useState(false);

  const handleBack = () => {
    router.push('/settings/acc&settings');
  };

  const helpItems = [
    { label: 'About SFAMS', icon: require('../../assets/icons/info.png'), hasDot: false },
    { label: 'Contact Us', icon: require('../../assets/icons/info.png'), hasDot: false },
    { label: 'Report a Problem', icon: require('../../assets/icons/info.png'), hasDot: false },
  ];

  const handleHelpPress = (label) => {
    if (label === 'About SFAMS') {
      setShowAbout(true);
    } else if (label === 'Contact Us') {
      Linking.openURL('mailto:support@sfams.com?subject=Support Request');
    } else if (label === 'Report a Problem') {
      router.push('/settings/report-problem');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/go-back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>HELP & SUPPORT</Text>
      </View>
      <View style={styles.content}>
        {helpItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleHelpPress(item.label)}
            activeOpacity={0.7}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.buttonText}>{item.label}</Text>
            {item.hasDot && <View style={styles.dot} />}
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={showAbout} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About SFAMS</Text>
            <Text style={styles.modalText}>
              SFAMS (Student Financial Aid Management System) is a comprehensive mobile application designed to help students manage their financial aid applications, track scholarships, and stay informed about funding opportunities.
            </Text>
            <Text style={styles.modalText}>
              Version: 1.0.0
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowAbout(false)} activeOpacity={0.7}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#FE005F',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFF00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: '#FE005F',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
