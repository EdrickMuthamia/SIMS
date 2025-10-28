import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { settingsOptions } from '../data/settingsData';
import colors from '../styles/colors';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ACCOUNT & SETTINGS</Text>
      </View>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>
            {item.hasDot && <View style={styles.dot} />}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
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
  list: { padding: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
  },
  icon: { width: 24, height: 24, marginRight: 15, tintColor: colors.text },
  label: { color: colors.text, fontSize: 16 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
