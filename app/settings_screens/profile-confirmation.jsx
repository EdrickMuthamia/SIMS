import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileConfirmation() {
  const router = useRouter();

  const handleDone = () => {
    console.log('Profile confirmation done');
    router.back(); // Navigate back to previous screen
  };

  const handleClose = () => {
    console.log('Profile confirmation closed');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.dialog}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose} activeOpacity={0.7}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Image source={require('../../assets/icons/user.png')} style={styles.checkmark} />
        <Text style={styles.message}>PROFILE UPDATED</Text>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone} activeOpacity={0.7}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FE005F',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkmark: {
    width: 50,
    height: 50,
    tintColor: '#00FF00', // Green checkmark
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE005F',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#FE005F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  doneText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
