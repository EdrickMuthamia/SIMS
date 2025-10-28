import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../constants/theme";
import { Alert } from "react-native";

export default function UsersScreen() {
  const router = useRouter();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ramsey Anyona",
      role: "Admin",
      email: "ramseyanjona@gmail.com",
      joined: "20 Mar 2025",
      color: "#F3B52E",
      department: "IT",
      branch: "Nairobi HQ",
      phone: "+254712345678",
      status: "Active",
      image: null,
    },
    {
      id: 2,
      name: "Najma Shaban",
      role: "Manager",
      email: "najmashaban@gmail.com",
      joined: "1 Oct 2025",
      color: "#F3B52E",
      department: "Procurement",
      branch: "Mombasa Branch",
      phone: "+254700111222",
      status: "Active",
      image: null,
    },
    {
      id: 3,
      name: "Edrick Muthamia",
      role: "Staff",
      email: "edrickmuthamia@gmail.com",
      joined: "15 Oct 2025",
      color: "#F3B52E",
      department: "Finance",
      branch: "Nakuru Office",
      phone: "+254701223344",
      status: "Suspended",
      image: null,
    },
    {
      id: 4,
      name: "Apple Reseller",
      role: "Vendor",
      email: "contact@applereseller.com",
      joined: "21 Oct 2025",
      color: "#F3B52E",
      department: "Vendors",
      branch: "External Partner",
      phone: "+254700987654",
      status: "Active",
      image: null,
    },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editImage, setEditImage] = useState(null);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditImage(user.image || null);
    setEditModalVisible(true);
  };

  const openInfoModal = (user) => {
    setSelectedUser(user);
    setInfoModalVisible(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setEditImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setEditImage(null);
  };

  const saveChanges = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, name: editName, email: editEmail, image: editImage }
          : u
      )
    );
    setEditModalVisible(false);
  };
        // Delete user
   const handleRemoveUser = (id) => {
        Alert.alert(
        "Confirm Delete",
        "Are you sure you want to remove the most recently viewed user?",
       [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        },
      },
       ]
     );
    };


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => router.push("/userManagement")}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
        <Text style={styles.headerText}>USERS</Text>
      </View>

      {/* SEARCH & ADD */}
      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/user_screens/addUser_screens/step_1")}
        >
          <Text style={styles.addButtonText}>+ Add User</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#aaa"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* FILTER */}
      <TouchableOpacity style={styles.filterRow}>
        <Text style={styles.filterText}>FILTER BY ▾   ADMINS   MANAGERS   USERS</Text>
      </TouchableOpacity>

      {/* USERS LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userCard}
            onPress={() => openInfoModal(user)}
            activeOpacity={0.8}
          >
            {/* LEFT SIDE: Avatar + Edit button */}
            <View style={styles.avatarSection}>
              <Image
                source={
                  user.image
                    ? { uri: user.image }
                    : require("../../assets/avatar.png")
                }
                style={styles.userAvatar}
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openEditModal(user)}
              >
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>
            </View>

            {/* RIGHT SIDE: User Info */}
            <View style={styles.userInfo}>
              <Text style={styles.userRole}>
                <Text style={{ color: "#fff" }}>ROLE: </Text>
                <Text style={{ color: user.color }}>{user.role}</Text>
              </Text>
              <Text style={styles.userName}>NAME: {user.name}</Text>
              <Text style={styles.userEmail}>EMAIL: {user.email}</Text>
              <Text style={styles.userJoined}>Joined: {user.joined}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FOOTER BUTTONS */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButtonBlue}
          onPress={() => router.push("user_screens/roles&perms")}
        >
          <Text style={styles.footerButtonText}>View permission settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.footerButtonRed}
         onPress={() => {
          if (selectedUser) {
          handleRemoveUser(selectedUser.id);
          setInfoModalVisible(false);
          } else {
         Alert.alert("No user selected", "Tap on a user first to select them.");
        }
       }}
      >
       <Text style={styles.footerButtonText}>Remove User</Text>
       </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.exportButton}>
        <Text style={styles.exportText}>Export User List (CSV)</Text>
      </TouchableOpacity>

      {/* INFO MODAL */}
      <Modal transparent visible={infoModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalBox}>
            {selectedUser && (
              <>
                <Text style={styles.modalTitle}>{selectedUser.name.toUpperCase()}</Text>
                <Text style={styles.detailText}> {selectedUser.email}</Text>
                <Text style={styles.detailText}> {selectedUser.phone}</Text>
                <Text style={styles.detailText}> DEPARTMENT: {selectedUser.department}</Text>
                <Text style={styles.detailText}> BRANCH: {selectedUser.branch}</Text>
                <Text style={styles.statusText}>
                   STATUS:{" "}
                  <Text
                    style={{
                      color: selectedUser.status === "Active" ? "#5EEBA1" : "#F87171",
                    }}
                  >
                    {selectedUser.status}
                  </Text>
                </Text>
                <Text style={styles.statusText}> Joined: {selectedUser.joined}</Text>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: COLORS.primary, marginTop: 20 }]}
                  onPress={() => setInfoModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* EDIT MODAL */}
      <Modal transparent visible={editModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit User Details</Text>

            {/* Upload or change photo */}
            <View style={{ alignItems: "center", marginBottom: 15 }}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    editImage
                      ? { uri: editImage }
                      : require("../../assets/avatar.png")
                  }
                  style={styles.editAvatar}
                />
              </TouchableOpacity>
              <Text style={{ color: "#bbb", fontSize: 12, marginTop: 5 }}>
                Tap to {editImage ? "change photo" : "add photo"}
              </Text>
              {editImage && (
                <TouchableOpacity onPress={removeImage} style={{ marginTop: 8 }}>
                  <Text style={{ color: "#F87171", fontSize: 13 }}>Remove photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.modalInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter new name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.modalInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter new email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#444" }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.primary }]}
                onPress={saveChanges}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", paddingHorizontal: 20 },
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 40,
    width: "60%",
  },
  searchInput: { color: "#000", flex: 1 },
  filterRow: { alignSelf: "flex-end", marginBottom: 10 },
  filterText: { color: "#bbb", fontSize: 12, letterSpacing: 1 },
  userCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#3a3a3a",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    width: "98%",
    alignSelf: "center",
    elevation: 3,
  },
  avatarSection: { alignItems: "center", marginRight: 15 },
  userAvatar: { width: 65, height: 65, borderRadius: 35, marginBottom: 8 },
  userInfo: { flex: 1, paddingLeft: 5 },
  userRole: { fontWeight: "bold", fontSize: 14, marginBottom: 3 },
  userName: { color: "#fff", fontSize: 13 },
  userEmail: { color: "#fff", fontSize: 13 },
  userJoined: { color: "#999", fontSize: 12 },
  editButton: {
    backgroundColor: "#006EC4",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  editText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  footerButtonBlue: {
    flex: 1,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
  footerButtonRed: {
    flex: 1,
    backgroundColor: "#E53935",
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
  footerButtonText: { color: "#fff", fontWeight: "bold" },
  exportButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  exportText: { color: "#ccc", fontSize: 12 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 15,
    width: "85%",
  },
  infoModalBox: {
    backgroundColor: "#1E1E1E",
    padding: 25,
    borderRadius: 20,
    width: "85%",
    alignItems: "flex-start",
  },
  modalTitle: { color: "#fff", fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  detailText: { color: "#ffffffff", fontSize: 16, marginVertical: 2 },
  statusText: { color: "#bdbdbdff", fontSize: 16, marginVertical: 2, paddingLeft:100, paddingTop:5 },
  inputGroup: { marginBottom: 12 },
  label: { color: "#bbb", fontSize: 13, marginBottom: 4 },
  modalInput: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
});
