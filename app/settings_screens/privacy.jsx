import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Privacy() {
  const router = useRouter();
  const [dataSharing, setDataSharing] = useState(false);
  const [locationTracking, setLocationTracking] = useState(false);
  const [accountPrivate, setAccountPrivate] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [comments, setComments] = useState(true);
  const [reviews, setReviews] = useState(true);

  const handleBack = () => {
    router.push('/settings/acc&settings');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/go-back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>PRIVACY SETTINGS</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Data Sharing pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/shield .png')} style={styles.icon} />
          <Text style={styles.buttonText}>Data Sharing</Text>
          <Switch value={dataSharing} onValueChange={setDataSharing} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Location Tracking pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/shield .png')} style={styles.icon} />
          <Text style={styles.buttonText}>Location Tracking</Text>
          <Switch value={locationTracking} onValueChange={setLocationTracking} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Account Private/Public pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/lock.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Account Private</Text>
          <Switch value={accountPrivate} onValueChange={setAccountPrivate} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Show Active pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/user.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Show Active Status</Text>
          <Switch value={showActive} onValueChange={setShowActive} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Comments pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Allow Comments</Text>
          <Switch value={comments} onValueChange={setComments} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Reviews pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Allow Reviews</Text>
          <Switch value={reviews} onValueChange={setReviews} />
        </TouchableOpacity>
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
});
