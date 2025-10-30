import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, ScrollView } from 'react-native';
import { useState } from 'react';

export default function Security() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const devices = [
    { name: 'iPhone 16 Pro Max', icon: require('../../assets/icons/iPhone  16 Pro max.png') },
    { name: 'iPad mini', icon: require('../../assets/icons/iPad mini.png') },
    { name: 'Google Pixel 9a', icon: require('../../assets/icons/Google Pixel 9a.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SECURITY SETTINGS</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Two-Factor Authentication pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/Two-Factor  Authentication.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Two-Factor Authentication</Text>
          <Switch value={twoFactor} onValueChange={setTwoFactor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Change Password pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/Change  Password.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Change Password</Text>
          <Switch value={changePassword} onValueChange={setChangePassword} />
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MY DEVICES</Text>
          {devices.map((device, index) => (
            <View key={index} style={styles.deviceRow}>
              <Image source={device.icon} style={styles.deviceIcon} />
              <Text style={styles.deviceText}>{device.name}</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={() => console.log(`Logout from ${device.name}`)} activeOpacity={0.7}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  deviceIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#FFFFFF',
  },
  deviceText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#FE005F',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
