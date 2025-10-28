import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "../../../constants/theme";

export default function AddUserStep2() {
const router = useRouter();
const { name, role, email } = useLocalSearchParams();
const [phone, setPhone] = useState("");
const [department, setDepartment] = useState("");
const [location, setLocation] = useState("");

const handleNext = () => {
router.push({
pathname: "/user_screens/addUser_screens/step_3",
params: { name, role, email, phone, department, location },
});
};

return ( <View style={styles.container}> <View style={styles.header}>
<TouchableOpacity style={styles.backArrow} onPress={() => router.back()}> <Text style={styles.backText}>←</Text> </TouchableOpacity>
<Image source={require("../../../assets/icon.png")} style={styles.buildingIcon} />
<Image source={require("../../../assets/splash-icon.png")} style={styles.cubeIcon} /> <Text style={styles.headerText}>ADD USER - STEP 2</Text> </View>


  <Text style={styles.stepTitle}>Optional Information</Text>

  <View style={styles.formBox}>
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
nextButton: {
backgroundColor: COLORS.primary,
borderRadius: 25,
marginTop: 25,
paddingVertical: 10,
paddingHorizontal: 40,
},
nextText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
