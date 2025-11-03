import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';

export default function SearchHistory() {
  const [history, setHistory] = useState([
    'Search 1: React Native',
    'Search 2: Expo Router',
    'Search 3: Privacy Settings',
  ]);

  const clearHistory = () => {
    Alert.alert(
      'Clear Search History',
      'Are you sure you want to clear all search history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => setHistory([]) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SEARCH HISTORY</Text>
      </View>
      <View style={styles.content}>
        {history.length > 0 ? (
          history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No search history available.</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={clearHistory} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Clear Search History</Text>
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
  historyItem: {
    backgroundColor: '#333333',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  emptyText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FE005F',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
