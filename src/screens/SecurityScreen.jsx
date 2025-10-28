import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';
import colors from '../styles/colors';

const securityOptions = [
  {
    id: 'changePassword',
    label: 'Change Password',
    icon: require('../../assets/icons/changepassword.png'),
  },
  {
    id: 'twoFactor',
    label: 'Two-Factor Authentication',
    icon: require('../../assets/icons/twofactorauthentication.png'),
  },
];

const devices = [
  {
    id: 'iphone',
    name: 'iPhone 16 Pro Max',
    icon: require('../../assets/icons/iphone16promax.png'),
  },
  {
    id: 'pixel',
    name: 'Google Pixel 9a',
    icon: require('../../assets/icons/Google Pixel 9a.png'),
  },
  {
    id: 'ipad',
    name: 'iPad mini',
    icon: require('../../assets/icons/iPad mini.png'),
  },
];

export default function SecurityScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    // Here you would typically call an API to change the password
    Alert.alert('Success', 'Password changed successfully');
    setChangePasswordModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out from all devices?',
      [
        { text: 'Cancel', onPress: () => console.log('Logout cancelled'), style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('Logged out from all devices'), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SECURITY SETTINGS</Text>
      </View>

      <View style={styles.section}>
        {securityOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.row}
            onPress={() => {
              if (item.id === 'changePassword') {
                setChangePasswordModalVisible(true);
              }
            }}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>
            {item.id === 'changePassword' && (
              <Image source={require('../../assets/icons/Updates.png')} style={styles.arrowIcon} />
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.option}>
          <Text style={styles.optionText}>Two-Factor Authentication</Text>
          <ToggleSwitch value={twoFactorEnabled} onValueChange={setTwoFactorEnabled} />
        </View>
      </View>

      <Text style={styles.subHeader}>MY DEVICES</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout from all devices</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setChangePasswordModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
                <Text style={styles.saveText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  subHeader: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  icon: { width: 24, height: 24, marginRight: 15 },
  label: { color: colors.text, fontSize: 16 },
  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
  },
  logoutText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: { color: colors.text, fontSize: 16 },
  arrowIcon: { width: 16, height: 16, tintColor: colors.text },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#000',
    color: colors.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginRight: 10,
  },
  cancelText: { color: colors.text, fontSize: 16 },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
