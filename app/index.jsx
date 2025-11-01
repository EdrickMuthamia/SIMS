import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const menuItems = [
    { label: 'Account & Settings', icon: require('../assets/icons/user.png'), route: '/settings/acc&settings' },
    { label: 'Security', icon: require('../assets/icons/security.png'), route: '/settings/security' },
    { label: 'Notifications', icon: require('../assets/icons/bell.png'), route: '/settings/notifications' },
    { label: 'Privacy', icon: require('../assets/icons/shield .png'), route: '/settings/privacy' },
    { label: 'Search History', icon: require('../assets/icons/info.png'), route: '/settings/search-history' },
    { label: 'Terms & Conditions', icon: require('../assets/icons/info.png'), route: '/settings/terms' },
    { label: 'Help & Support', icon: require('../assets/icons/info.png'), route: '/settings/help' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SFAMS</Text>
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
    paddingVertical: 40,
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: '#FFFF00',
  },
  headerText: {
    color: '#FFFF00',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    tintColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});
