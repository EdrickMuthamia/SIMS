import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';
import colors from '../styles/colors';

export default function NotificationsScreen() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NOTIFICATIONS</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Types</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Push Notifications</Text>
          <ToggleSwitch value={push} onValueChange={setPush} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Email Notifications</Text>
          <ToggleSwitch value={email} onValueChange={setEmail} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>SMS Notifications</Text>
          <ToggleSwitch value={sms} onValueChange={setSms} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Categories</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Account Updates</Text>
          <ToggleSwitch value />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Security Alerts</Text>
          <ToggleSwitch value />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Promotional</Text>
          <ToggleSwitch value={false} />
        </View>
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
  },
  section: { padding: 20 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: { color: colors.text, fontSize: 16 },
});
