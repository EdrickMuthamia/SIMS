import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../constants/theme";



export default function Requests() {
  const router = useRouter();

  const requests = [
    { serial: "0468P09", name: "LENOVO IDEAPAD", requester: "NAJMA SHAABAN", date: "2 Oct 2025", status: "APPROVED" },
    { serial: "0469P10", name: "DELL G16 7630", requester: "WILLIAM KURIA", date: "1 May 2024", status: "DECLINE" },
    { serial: "0470P11", name: "PREDATOR PRO M612", requester: "EDRICK MUTHAMA", date: "10 May 2024", status: "APPROVE" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>REQUESTS</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput placeholder="Search..." placeholderTextColor={COLORS.grey} style={styles.input} />
      </View>

      <ScrollView style={styles.scroll}>
        {requests.map((req, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.itemText}>SERIAL ID: {req.serial}</Text>
            <Text style={styles.itemText}>DEVICE: {req.name}</Text>
            <Text style={styles.itemText}>REQUESTED BY: {req.requester}</Text>
            <Text style={styles.itemText}>DATE: {req.date}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.statusButton, { backgroundColor: req.status === "APPROVED" ? COLORS.success : COLORS.danger }]}
              >
                <Text style={styles.statusText}>{req.status}</Text>
              </TouchableOpacity>
            </View>
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
  scroll: { marginTop: 10 },
  card: {
    backgroundColor: COLORS.lightGrey,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  itemText: { color: COLORS.black, fontSize: 14, marginVertical: 2 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  statusButton: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 8 },
  statusText: { color: COLORS.white, fontWeight: "bold" },
});