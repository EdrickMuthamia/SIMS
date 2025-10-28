import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { COLORS } from "../../constants/theme";

export const roles = [
      {
      name: "Admin",
      description: "Full system access, manage all users & settings",
      color: "#436ab1ff",
    },
    {
      name: "Manager",
      description: "Oversees inventory, Approve orders",
      color: "#F3B52E",
    },
    {
      name: "Staff",
      description: "Add/View Inventory, manage tasks",
      color: "#50C878",
    },
    {
      name: "Vendor",
      description: "Create and track purchase order",
      color: "#E74C3C",
    },
]

export default function RolesPermissions() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [roles, setRoles] = useState([
    {
      name: "Admin",
      description: "Full system access, manage all users & settings",
      color: "#436ab1ff",
    },
    {
      name: "Manager",
      description: "Oversees inventory, Approve orders",
      color: "#F3B52E",
    },
    {
      name: "Staff",
      description: "Add/View Inventory, manage tasks",
      color: "#50C878",
    },
    {
      name: "Vendor",
      description: "Create and track purchase order",
      color: "#E74C3C",
    },
  ]);

  // When returning from AddRole, add the new role to the list
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

        {roles.map((role) => (
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
        ))}
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
