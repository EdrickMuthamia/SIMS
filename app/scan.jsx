import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Scan = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner</Text>
      
      <Text style={styles.scanText}>SCAN HERE:</Text>
      
      <View style={styles.qrBox}>
        <View style={styles.innerBox}>
          <Text style={styles.qrText}>📱</Text>
          <Text style={styles.qrSubText}>QR/Barcode</Text>
        </View>
      </View>
      
      <Text style={styles.instruction}>SCAN THE QR CODE/ BARCODE</Text>
      
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
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 50,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  scanText: {
    color: "#FFD700",
    marginBottom: 20,
    fontWeight: "600",
    fontSize: 16,
  },
  qrBox: {
    width: 260,
    height: 260,
    backgroundColor: "#D3D3D3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  innerBox: {
    width: 180,
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  qrText: {
    fontSize: 60,
    marginBottom: 10,
  },
  qrSubText: {
    fontSize: 14,
    color: "#666",
  },
  instruction: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Scan;
