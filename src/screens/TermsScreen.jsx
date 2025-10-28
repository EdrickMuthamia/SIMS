import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../styles/colors';

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TERMS & POLICIES</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.text}>
          Welcome to our app. By using our service, you agree to these terms.{'\n\n'}1. Acceptance of Terms{'\n'}By accessing and using this app, you accept and agree to be bound by the terms and provision of this agreement.{'\n\n'}2. Use License{'\n'}Permission is granted to temporarily download one copy of the materials on our app for personal, non-commercial transitory viewing only.{'\n\n'}3. Disclaimer{'\n'}The materials on our app are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Text>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.{'\n\n'}Information We Collect:{'\n'}- Personal information you provide (name, email, phone){'\n'}- Usage data and analytics{'\n'}- Device information{'\n\n'}How We Use Your Information:{'\n'}- To provide and maintain our service{'\n'}- To communicate with you{'\n'}- To improve our app
        </Text>
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
  content: { padding: 20 },
  title: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
  text: { color: colors.text, fontSize: 14, lineHeight: 20 },
});
