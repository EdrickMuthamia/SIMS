import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import colors from '../styles/colors';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?\d{10,15}$/.test(phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.text, fontSize: 18 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <View style={globalStyles.headerContent}>
          <Image source={require('../../assets/icons/logo.png')} style={globalStyles.headerIcon} />
          <Text style={globalStyles.headerTitle}>EDIT PROFILE</Text>
          <Image source={require('../../assets/icons/Updates.png')} style={globalStyles.headerIconRight} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../assets/icons/user.png')} style={styles.avatar} />
        </View>
        <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          placeholder="Enter your name"
          placeholderTextColor="#888"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (errors.phone) setErrors({ ...errors, phone: '' });
          }}
          placeholder="Enter your phone"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>SAVE CHANGES</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20 },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  form: { flex: 1 },
  label: { color: colors.text, fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: colors.surface,
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
  saveText: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
});
