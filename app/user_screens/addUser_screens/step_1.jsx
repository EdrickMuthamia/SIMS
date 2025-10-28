import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  Animated,
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const roleButtonRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const availableRoles = roles.map((r) => r.name);

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

  const openDropdown = () => {
    roleButtonRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPosition({ top: y + height + 5, left: x, width });
      setDropdownVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const closeDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setDropdownVisible(false));
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

      <Text style={styles.stepTitle}>Basic Information</Text>

      <View style={styles.formBox}>
        {/* Upload Photo */}
        <TouchableOpacity onPress={handleUploadPhoto} style={styles.avatarContainer}>
          <Image
            source={avatar ? { uri: avatar } : require("../../../assets/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.uploadText}>Upload Photo</Text>
        </TouchableOpacity>

        {/* Name */}
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
            ref={roleButtonRef}
            style={[styles.input, { justifyContent: "center" }]}
            onPress={openDropdown}
          >
            <Text style={{ color: role ? "#fff" : "#999" }}>{role || "Select role"}</Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <Modal transparent visible={dropdownVisible} onRequestClose={closeDropdown}>
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={closeDropdown}
              >
                <Animated.View
                  style={[
                    styles.dropdown,
                    {
                      position: "absolute",
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      width: dropdownPosition.width,
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-5, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <FlatList
                    data={availableRoles}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setRole(item);
                          closeDropdown();
                        }}
                      >
                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </Animated.View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>

        {/* Email */}
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
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    color: "#fff",
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
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    backgroundColor: "#222",
    borderRadius: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  dropdownText: { color: "#fff", fontSize: 14 },
});
