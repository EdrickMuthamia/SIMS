import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "../../../constants/theme";

export default function AddUserStep3() {
const router = useRouter();
const params = useLocalSearchParams();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [successModal, setSuccessModal] = useState(false);

const handleDone = () => {
if (!password || !confirmPassword) {
alert("Please fill in both password fields");
return;
}
if (password !== confirmPassword) {
alert("Passwords do not match");
return;
}


setSuccessModal(true);
setTimeout(() => {
  setSuccessModal(false);
  router.push("/user_screens/users");
}, 2500);


};

return ( <View style={styles.container}> <View style={styles.header}>
<TouchableOpacity style={styles.backArrow} onPress={() => router.back()}> <Text style={styles.backText}>←</Text> </TouchableOpacity>
<Image source={require("../../../assets/icon.png")} style={styles.buildingIcon} />
<Image source={require("../../../assets/splash-icon.png")} style={styles.cubeIcon} /> <Text style={styles.headerText}>ADD USER - STEP 3</Text> </View>


  <Text style={styles.stepTitle}>Create Password</Text>

  <View style={styles.formBox}>
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

  <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
    <Text style={styles.doneText}>✔ Done</Text>
  </TouchableOpacity>

  <Modal visible={successModal} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.successBox}>
        <Text style={styles.successText}>USER SUCCESSFULLY ADDED</Text>
        <Text style={styles.inviteText}>Invitation email sent ✉️</Text>
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
cubeIcon: { position: "absolute", right: 25, top: 65, width: 40, height: 40 },
headerText: { color: "#fff", fontWeight: "bold", fontSize: 22 },
stepTitle: { color: "#FFD700", marginVertical: 20, fontSize: 18, fontWeight: "bold" },
formBox: {
width: "90%",
backgroundColor: "#2a2a2a",
borderRadius: 20,
padding: 20,
},
inputGroup: { width: "100%", marginBottom: 15 },
label: { color: "#fff", fontSize: 13, marginBottom: 4 },
input: {
backgroundColor: "#ccc",
borderRadius: 20,
paddingVertical: 10,
paddingHorizontal: 18,
color: "#000",
},
doneButton: {
backgroundColor: COLORS.primary,
borderRadius: 25,
marginTop: 25,
paddingVertical: 10,
paddingHorizontal: 40,
},
doneText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
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
