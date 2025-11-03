import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { COLORS } from "../../constants/theme";

//import backend function

import { fetchroles } from "../../services/rolesPermsInstance";

export default function RolesPermissions() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch roles from backend when screen loads
  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await fetchroles();
      // optional: map backend data to the structure your UI expects
      const formatted = data.map((r) => ({
        name: r.role_name,
        description: r.description || "No description provided",
        color: "#436ab1ff", // you can assign colors dynamically later
      }));
      setRoles(formatted);
    } catch (error) {
      console.error("Error loading roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRoles();
    }, [])
  );

  // Add role dynamically after navigating back from addRole
  useFocusEffect(
    useCallback(() => {
      if (params?.newRole) {
        try {
          const parsedRole = JSON.parse(params.newRole);
          const exists = roles.some((r) => r.name === parsedRole.name);
          if (!exists) {
            setRoles((prev) => [...prev, parsedRole]);
          }
        } catch (error) {
          console.log("Error parsing new role:", error);
        }
      }
    }, [params])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => router.push("user_screens/users")}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
        <Text style={styles.headerText}>USERS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>ROLES & PERMISSIONS</Text>
        <Text style={styles.subHeader}>→ Define and Manage User Capabilities</Text>

        {/* Add Role Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("user_screens/addRole")}
        >
          <Text style={styles.addButtonText}>+ Add New Role</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : roles.length === 0 ? (
          <Text style={{ color: "#ccc", textAlign: "center", marginTop: 20 }}>
            No roles found.
          </Text>
        ) : (
          roles.map((role) => (
            <View key={role.name} style={styles.roleCard}>
              <Text style={[styles.roleName, { color: role.color }]}>{role.name}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>

              <TouchableOpacity
                style={styles.permissionButton}
                onPress={() =>
                  router.push({
                    pathname: "user_screens/edit_perms",
                    params: { role: role.name },
                  })
                }
              >
                <Text style={styles.permissionButtonText}>Edit Permissions</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  backArrow: { position: "absolute", top: 60, left: 25 },
  backText: { color: "#fff", fontSize: 26 },
  buildingIcon: { width: 80, height: 80, resizeMode: "contain" },
  cubeIcon: { position: "absolute", right: 40, top: 40, width: 30, height: 30 },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 5 },
  sectionHeader: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  subHeader: { color: "#ccc", marginBottom: 15 },
  addButton: {
    alignSelf: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  roleCard: {
    backgroundColor: "#383535ff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
  },
  roleName: { fontWeight: "bold", fontSize: 18 },
  roleDescription: { color: "#ccc", marginVertical: 6 },
  permissionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
  },
  permissionButtonText: { color: "#fff", fontWeight: "bold" },
});
