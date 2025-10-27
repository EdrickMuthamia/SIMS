import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIMS</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/items')}
      >
        <Text style={styles.buttonText}>Go to Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#520808ff",
  },
  title: {
    fontSize: 32,
    color: "#fff",
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