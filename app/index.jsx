import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const menuItems = [
    { label: 'My Profile', icon: require('../assets/icons/user.png'), route: '/settings/profile-form' },
    { label: 'Security Settings', icon: require('../assets/icons/security.png'), route: '/settings/security' },
    { label: 'Notifications', icon: require('../assets/icons/bell.png'), route: '/settings/notifications' },
    { label: 'Privacy Settings', icon: require('../assets/icons/shield .png'), route: '/settings/privacy' },
    { label: 'Search History', icon: require('../assets/icons/info.png'), route: '/settings/search-history' },
    { label: 'Terms & Conditions', icon: require('../assets/icons/info.png'), route: '/settings/terms' },
    { label: 'Help & Support', icon: require('../assets/icons/info.png'), route: '/settings/help' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ACCOUNT & SETTINGS</Text>
      </View>
      <View style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => router.push(item.route)}
            activeOpacity={0.7}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
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
  },
});
