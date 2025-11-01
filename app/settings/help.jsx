import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Help() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/settings/acc&settings');
  };

  const helpItems = [
    { label: 'About SFAMS', icon: require('../../assets/icons/info.png'), hasDot: false },
    { label: 'Contact Us', icon: require('../../assets/icons/info.png'), hasDot: false },
    { label: 'Report a Problem', icon: require('../../assets/icons/info.png'), hasDot: false },
  ];

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
            onPress={() => {
              if (item.label === 'Contact Us') {
                console.log('Opening email for contact: support@sfams.com');
              } else {
                console.log(`${item.label} pressed`);
              }
            }}
            activeOpacity={0.7}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.buttonText}>{item.label}</Text>
            {item.hasDot && <View style={styles.dot} />}
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
});
