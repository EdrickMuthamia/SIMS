import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleSwitch from '../components/ToggleSwitch';
import { globalStyles } from '../styles/globalStyles';
import colors from '../styles/colors';

export default function PrivacyScreen({ navigation }) {
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [cookies, setCookies] = useState(true);

  const handleDownloadData = () => {
    Alert.alert(
      'Download Data',
      'Your data will be prepared and sent to your email. This may take a few minutes.',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted.') }
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('Terms');
  };

  const handleCookieSettings = () => {
    Alert.alert(
      'Cookie Settings',
      'Manage your cookie preferences here.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.text, fontSize: 18 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <View style={globalStyles.headerContent}>
          <Image source={require('../../assets/icons/shield.png')} style={globalStyles.headerIcon} />
          <Text style={globalStyles.headerTitle}>PRIVACY</Text>
          <Image source={require('../../assets/icons/Updates.png')} style={globalStyles.headerIconRight} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Data Sharing</Text>
            <ToggleSwitch value={dataSharing} onValueChange={setDataSharing} />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Analytics</Text>
            <ToggleSwitch value={analytics} onValueChange={setAnalytics} />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Cookies</Text>
            <ToggleSwitch value={cookies} onValueChange={setCookies} />
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleDownloadData}>
            <Text style={styles.primaryButtonText}>Download My Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={handlePrivacyPolicy}>
            <Text style={styles.secondaryButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleCookieSettings}>
            <Text style={styles.secondaryButtonText}>Cookie Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: { color: colors.text, fontSize: 16 },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  dangerButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  dangerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButtonText: { color: colors.text, fontSize: 16 },
});
