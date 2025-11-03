import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";
import { addRole } from "../../services/rolesPermsInstance";

export default function AddRole() {
  const router = useRouter();
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!roleName || !description) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    const newRole = {
      name: roleName,
      description,
    };

    try {
      setLoading(true);
      const response = await addRole(newRole);

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Role added successfully!", [
          {
            text: "OK",
            onPress: () => router.push("user_screens/rolesPerms"),
          },
        ]);
      } else {
        Alert.alert("Error", "Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error adding role:", error);
      Alert.alert("Error", "Failed to add role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/icon.png")}
          style={styles.buildingIcon}
        />
        <Image
          source={require("../../assets/splash-icon.png")}
          style={styles.cubeIcon}
        />
        <Text style={styles.headerText}>ADD NEW ROLE</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>ROLE NAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter role name"
          placeholderTextColor="#888"
          value={roleName}
          onChangeText={setRoleName}
        />

        <Text style={styles.label}>DESCRIPTION:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Describe what this role does..."
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#666" }]}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: loading ? "#555" : COLORS.primary },
            ]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Saving..." : "Save Role"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", alignItems: "center" },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    marginBottom: 20,
  },
  backArrow: { position: "absolute", top: 60, left: 25 },
  backText: { color: "#fff", fontSize: 26 },
  buildingIcon: { width: 80, height: 80, resizeMode: "contain" },
  cubeIcon: { position: "absolute", right: 40, top: 40, width: 30, height: 30 },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22 },
  form: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    width: "90%",
    padding: 20,
  },
  label: { color: "#fff", fontSize: 14, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: "#333",
    borderRadius: 15,
    color: "#fff",
    padding: 10,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
