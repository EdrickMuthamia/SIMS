import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants/theme";
import { roles } from "../roles&perms"; 

export default function AddUserStep1() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Get available roles from roles data
  const availableRoles = roles.map((r) => r.name);

  // Handle Next
  const handleNext = () => {
    if (!name || !role || !email) {
      alert("Please fill in all required fields");
      return;
    }
    router.push({
      pathname: "/user_screens/addUser_screens/step_2",
      params: { name, role, email, avatar },
    });
  };

  // Handle Image Upload
  const handleUploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../../assets/splash-icon.png")} style={styles.cubeIcon} />
        <Text style={styles.headerText}>ADD USER - STEP 1</Text>
      </View>

      {/* Step Title */}
      <Text style={styles.stepTitle}>Basic Information</Text>

      {/* Form */}
      <View style={styles.formBox}>
        {/* Avatar + Upload */}
        <TouchableOpacity onPress={handleUploadPhoto} style={styles.avatarContainer}>
          <Image
            source={avatar ? { uri: avatar } : require("../../../assets/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.uploadText}>Upload Photo</Text>
        </TouchableOpacity>

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>NAME:</Text>
          <TextInput
            placeholder="Enter full name"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Role Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ROLE:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={{ color: role ? "#000" : "#777" }}>
              {role || "Select role"}
            </Text>
          </TouchableOpacity>

          {/* Dropdown Modal */}
          <Modal
            visible={dropdownVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setDropdownVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setDropdownVisible(false)}
            >
              <View style={styles.dropdown}>
                <FlatList
                  data={availableRoles}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setRole(item);
                        setDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL:</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", alignItems: "center" },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 25,
    width: "100%",
  },
  backArrow: { position: "absolute", top: 60, left: 25 },
  backText: { color: "#fff", fontSize: 26 },
  buildingIcon: { width: 80, height: 80, resizeMode: "contain" },
  cubeIcon: { position: "absolute", right: 25, top: 65, width: 40, height: 40 },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22 },
  stepTitle: { color: "#FFD700", marginVertical: 20, fontSize: 18, fontWeight: "bold" },

  formBox: {
    width: "90%",
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  avatarContainer: { alignItems: "center", marginBottom: 15 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 6 },
  uploadText: { color: "#FFD700", fontSize: 13 },
  inputGroup: { width: "100%", marginBottom: 15 },
  label: { color: "#fff", fontSize: 13, marginBottom: 4 },
  input: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    color: "#000",
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  nextText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#333",
    width: "80%",
    borderRadius: 10,
    paddingVertical: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: "#555",
    borderBottomWidth: 1,
  },
  dropdownText: { color: "#fff", fontSize: 16 },
});
