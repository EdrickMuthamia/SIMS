import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const AssetBorrowScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [serialId, setSerialId] = useState(params.serialId || "");
  const [itemName, setItemName] = useState(params.itemName || "");
  const [borrowStatus, setBorrowStatus] = useState(params.borrowStatus || "");
  const [condition, setCondition] = useState(params.condition || "");

  const handleBorrowItem = () => {
    console.log("Borrowing item:", {
      serialId,
      itemName,
      borrowStatus,
      condition,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/")}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/icon.png")}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>ASSETS</Text>
          <Image
            source={require("../../assets/splash-icon.png")}
            style={styles.rightIcon}
          />
        </View>

        <Text style={styles.sectionTitle}>ASSET INFORMATION</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>SERIAL ID:</Text>
          <TextInput
            style={styles.input}
            value={serialId}
            onChangeText={setSerialId}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ITEM NAME:</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>BORROW STATUS:</Text>
          <TextInput
            style={styles.input}
            value={borrowStatus}
            onChangeText={setBorrowStatus}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CONDITION:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={condition}
            onChangeText={setCondition}
            placeholderTextColor="#666"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.borrowButton}
          onPress={handleBorrowItem}
        >
          <Text style={styles.borrowButtonText}>BORROW ITEM</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 30,
  },
  scrollContent: {
    padding: 10,
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
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buildingIcon: {
    width: 35,
    height: 35,
    justifyContent: "space-around",
  },
  buildingLine: {
    height: 3,
    backgroundColor: "#60a5fa",
    marginBottom: 2,
  },
  buildingBase: {
    height: 6,
    backgroundColor: "#60a5fa",
  },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#e5e7eb",
    borderRadius: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 40,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    top: 40,
    left: 10,
  },
  sectionTitle: {
    color: "#FBBF24",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 11,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#808080",
    borderRadius: 25,
    padding: 15,
    color: "#fff",
    fontSize: 14,
    minHeight: 50,
  },
  textArea: {
    minHeight: 150,
    borderRadius: 20,
    paddingTop: 15,
  },
  borrowButton: {
    backgroundColor: "#E91E63",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  borrowButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
});

export default AssetBorrowScreen;
