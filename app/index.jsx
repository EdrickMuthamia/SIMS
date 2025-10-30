import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020000ff" />
      <Text style={styles.title}>SIMS</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('items_screens/items')}
      >
        <Text style={styles.buttonText}>Go to Items</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('scanner_screens/scanner')}
      >
        <Text style={styles.buttonText}>Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('scanner_screens/assetBorrow')}
      >
        <Text style={styles.buttonText}>Assets</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020000ff",
  },
  title: {
    fontSize: 32,
    color: "#a18f8fff",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#E91E63",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    minWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Home;