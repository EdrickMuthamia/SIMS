import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { COLORS } from "../../constants/theme";
import { fetchPermissionsByRoleId, updateRole } from "../../services/rolesPermsInstance";

export default function EditPermissions() {
  const router = useRouter();
  const { role, roleId } = useLocalSearchParams(); // Expect roleId to be passed when navigating

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch permissions from backend
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const data = await fetchPermissionsByRoleId(roleId);
        const formatted = data.map((perm) => ({
          id: perm.id,
          name: perm.name,
          checked: perm.is_active ?? false,
        }));
        setPermissions(formatted);
      } catch (error) {
        console.error("Error loading permissions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPermissions();
  }, [roleId]);

  // Toggle permission
  const togglePermission = (index) => {
    const updated = [...permissions];
    updated[index].checked = !updated[index].checked;
    setPermissions(updated);
    setChanged(true);
  };

  // Save updated permissions
  const handleSave = async () => {
    try {
      setSaving(true);
      const updatedData = {
        permissions: permissions.map((p) => ({
          id: p.id,
          is_active: p.checked,
        })),
      };
      await updateRolePermissions(roleId, updatedData.permissions);
      alert("Permissions updated successfully!");
      setChanged(false);
    } catch (error) {
      console.error("Error saving permissions:", error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
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
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.buttonText}>
                {saving ? "Saving..." : "Save Permissions"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setChanged(false)}
              disabled={saving}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
