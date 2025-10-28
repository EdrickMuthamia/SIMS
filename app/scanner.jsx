import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

const Scanner = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Code Scanned", `Data: ${data}`, [
      { text: "Scan Again", onPress: () => setScanned(false) },
      { text: "Back", onPress: () => router.back() },
    ]);
  };



  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image
          source={require("../assets/icon.png")}
          style={styles.headerIcon}
        />
       
        <Image source={require("../assets/splash-icon.png")} style={styles.rightIcon} />
      </View>

      <Text style={styles.title}>SCAN HERE:</Text>

      <View style={styles.scannerWrapper}>
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39"],
            }}
          >
            <View style={styles.overlay}>
              <View style={styles.scanArea}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </CameraView>
        </View>
        <Text style={styles.instruction}>SCAN THE QR CODE/ BARCODE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    backgroundColor: "#E91E63",
    paddingVertical: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    
  },
  headerIcon: {
    width: 70,
    height: 80,
    position: "absolute",
    left: 170,
    top: 10,
  },
  rightIcon: {
    width: 35,
    height: 35,
    position: "absolute",
    right: 25,
    top: 50,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 18,
  },
  backArrow: {
    color: "#f1eaeaff",
    fontSize: 55,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    top: 40,
    left: 10,
  },
  title: {
    color: "#fbbf24",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    top: 30,
    marginBottom: 30,
  },
  scannerWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  scannerContainer: {
    backgroundColor: "#e5e5e5",
    borderRadius: 30,
    overflow: "hidden",
    aspectRatio: 0.7,
    padding: 30,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 180,
    height: 180,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#000",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  instruction: {
    color: "#666",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
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
    color: "#b10e0eff",
    fontSize: 16,
  },
});

export default Scanner;