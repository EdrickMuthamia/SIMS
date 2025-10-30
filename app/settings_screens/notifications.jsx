import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, ScrollView } from 'react-native';
import { useState } from 'react';

export default function Notifications() {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [newRequests, setNewRequests] = useState(true);
  const [orderStatus, setOrderStatus] = useState(true);
  const [newUserAddition, setNewUserAddition] = useState(false);
  const [updates, setUpdates] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NOTIFICATIONS</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Push Notifications pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/bell.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Push Notifications</Text>
          <Switch value={pushNotifications} onValueChange={setPushNotifications} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Email Notifications pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/bell.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Email Notifications</Text>
          <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('New Requests pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>New Requests</Text>
          <Switch value={newRequests} onValueChange={setNewRequests} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Order Status pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Order Status</Text>
          <Switch value={orderStatus} onValueChange={setOrderStatus} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('New User Addition pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/user.png')} style={styles.icon} />
          <Text style={styles.buttonText}>New User Addition</Text>
          <Switch value={newUserAddition} onValueChange={setNewUserAddition} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Updates pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Updates</Text>
          <Switch value={updates} onValueChange={setUpdates} />
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
  sectionTitle: {
    color: '#FFFF00',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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
