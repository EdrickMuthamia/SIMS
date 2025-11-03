import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("Press the button to test backend connection");

  const testBackend = async () => {
    try {
      const response = await fetch("http://192.168.1.18:3000"); // 👈 your Ubuntu IP
      const data = await response.json();
      setMessage(`✅ Backend says: ${data.message}`);
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setMessage("❌ Failed to connect to backend");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>{message}</Text>
      <Button title="Test Backend Connection" onPress={testBackend} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
