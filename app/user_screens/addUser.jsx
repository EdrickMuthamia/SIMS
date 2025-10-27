import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

export default function AddUserScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const handleAddUser = () => {
    if (!name || !role || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      role,
      email,
      phone,
      department,
      location,
      joined: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      color: "#47B4FF",
    };

    setSuccessModal(true);

    setTimeout(() => {
      setSuccessModal(false);
      router.push({
        pathname: "user_screens/users",
        params: { newUser: JSON.stringify(newUser) },
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
        <Text style={styles.headerText}>USERS</Text>
      </View>

      {/* FORM AREA */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.addTitle}>ADD NEW USER</Text>

          <View style={styles.formBox}>
            <Image source={require("../../assets/avatar.png")} style={styles.avatar} />

            {/* NAME */}
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

            {/* ROLE */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ROLE:</Text>
              <TextInput
                placeholder="e.g. Manager"
                placeholderTextColor="#999"
                style={styles.input}
                value={role}
                onChangeText={setRole}
              />
            </View>

            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL:</Text>
              <TextInput
                placeholder="example@gmail.com"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* EXTRA INFO INPUTS */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE (optional):</Text>
              <TextInput
                placeholder="e.g. +254700123456"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>DEPARTMENT (optional):</Text>
              <TextInput
                placeholder="e.g. IT, Finance, Logistics"
                placeholderTextColor="#999"
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>LOCATION (optional):</Text>
              <TextInput
                placeholder="e.g. Nairobi HQ"
                placeholderTextColor="#999"
                style={styles.input}
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* PASSWORDS */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CREATE PASSWORD:</Text>
              <TextInput
                placeholder="********"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CONFIRM PASSWORD:</Text>
              <TextInput
                placeholder="********"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          {/* DONE BUTTON */}
          <TouchableOpacity style={styles.doneButton} onPress={handleAddUser}>
            <Text style={styles.doneButtonText}>✔ Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* SUCCESS MODAL */}
      <Modal visible={successModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successBox}>
            <Text style={styles.successText}>USER SUCCESSFULLY ADDED</Text>
            <Text style={styles.inviteText}>Invitation sent ✉️</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", alignItems: "center" },
  header: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 25,
    width: "100%",
  },
  backArrow: { position: "absolute", top: 60, left: 25 },
  backText: { color: "#fff", fontSize: 26 },
  buildingIcon: { width: 80, height: 80, resizeMode: "contain" },
  cubeIcon: { position: "absolute", right: 25, top: 65, width: 40, height: 40 },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 5 },
  addTitle: { color: "#FFD700", fontWeight: "bold", fontSize: 18, marginVertical: 20 },
  formBox: {
    width: "92%",
    backgroundColor: "#2a2a2aff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  inputGroup: { width: "100%", marginBottom: 12 },
  label: { color: "#fff", fontSize: 13, marginBottom: 4 },
  input: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    color: "#000",
    fontSize: 14,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  doneButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  successBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "75%",
  },
  successText: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  inviteText: { fontSize: 14 },
});
