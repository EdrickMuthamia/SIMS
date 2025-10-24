import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../constants/theme";



export default function UserManagement() {
  const router = useRouter();

  const users = [
    { serial: "0468P09", name: "LENOVO IDEAPAD", status: "PENDING" },
    { serial: "0469F00", name: "DELL G16 7630", status: "DECLINED" },
    { serial: "0470G11", name: "PREDATOR PRO M612", status: "APPROVED" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>USER MANAGEMENT</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput placeholder="Search..." placeholderTextColor={COLORS.grey} style={styles.input} />
      </View>

      <ScrollView>
        {users.map((user, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.itemText}>SERIAL ID: {user.serial}</Text>
            <Text style={styles.itemText}>DEVICE: {user.name}</Text>

            <TouchableOpacity
              style={[
                styles.statusButton,
                {
                  backgroundColor:
                    user.status === "APPROVED"
                      ? COLORS.success
                      : user.status === "PENDING"
                      ? COLORS.warning
                      : COLORS.danger,
                },
              ]}
            >
              <Text style={styles.statusText}>{user.status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black, padding: 15 },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: { color: COLORS.white, fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  backArrow: { color: COLORS.white, fontSize: 20 },
  searchBar: { marginVertical: 15, alignItems: "center" },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    color: COLORS.black,
  },
  card: {
    backgroundColor: COLORS.lightGrey,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  itemText: { color: COLORS.black, fontSize: 14, marginVertical: 2 },
  statusButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: { color: COLORS.white, fontWeight: "bold" },
});