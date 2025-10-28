import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import colors from '../styles/colors';

export default function EditProfileScreen({ navigation }) {
  const initialName = 'John Doe';
  const initialEmail = 'john.doe@example.com';
  const initialPhone = '+1234567890';

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const handleSave = () => {
    if (name === initialName && email === initialEmail && phone === initialPhone) {
      Alert.alert('Edit Profile First');
    } else {
      // Here you could save to state or API
      Alert.alert('Edit Profile Complete');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EDIT PROFILE</Text>
        <Image source={require('../../assets/icons/user.png')} style={styles.avatar} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>SAVE CHANGES</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 10,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  form: { padding: 20 },
  label: { color: colors.text, fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: '#000',
    color: colors.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});