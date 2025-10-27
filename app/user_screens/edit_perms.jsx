import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { COLORS } from "../../constants/theme";

export default function EditPermissions() {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  const [permissions, setPermissions] = useState([
    { name: "View User List", checked: true },
    { name: "Add/Edit User", checked: false },
    { name: "View Items List", checked: true },
    { name: "View Order History", checked: false },
    { name: "View Vendors List", checked: true },
    { name: "Manage Vendor List", checked: false },
    { name: "Manage Items", checked: false },
    { name: "View All Levels", checked: true },
    { name: "Role Permissions Access", checked: true },
  ]);

  const [changed, setChanged] = useState(false);

  const togglePermission = (index) => {
    const updated = [...permissions];
    updated[index].checked = !updated[index].checked;
    setPermissions(updated);
    setChanged(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => router.back()}
        >
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
        <Text style={styles.headerText}>USERS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.roleTitle}>{role}</Text>
        <Text style={styles.permissionsLabel}>Permissions</Text>

        {permissions.map((perm, index) => (
          <View key={index} style={styles.permissionRow}>
            <TouchableOpacity
              style={styles.permissionBox}
              onPress={() => togglePermission(index)}
            >
              <Text style={styles.permissionText}>{perm.name}</Text>
            </TouchableOpacity>
            <Checkbox
              value={perm.checked}
              onValueChange={() => togglePermission(index)}
              color={perm.checked ? COLORS.primary : undefined}
            />
          </View>
        ))}

        {changed && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setChanged(false)}
            >
              <Text style={styles.buttonText}>Save Permissions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setChanged(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

import { Image } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  header: {
  backgroundColor: COLORS.primary,
  borderRadius: 30,
  height: 170, 
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  },
  backArrow: { position: "absolute", top: 60, left: 25 },
  backText: { color: "#fff", fontSize: 26 },
  buildingIcon: { width: 80, height: 80, resizeMode: "contain" },
  cubeIcon: {
    position: "absolute",
    right: 25,
    top: 65,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 5 },
  roleTitle: {
    alignSelf: "center",
    backgroundColor: "#444",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  permissionsLabel: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  permissionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  permissionBox: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  permissionText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#E53935",
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
