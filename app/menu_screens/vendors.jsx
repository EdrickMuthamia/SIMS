import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

export default function VendorsScreen() {
  const router = useRouter();

  const vendors = [
    { name: "Apple Reseller", email: "contact@apple.reseller.com", phone: "+254 780 643 529", location: "Nairobi, Kenya" },
    { name: "BuildSmart", email: "contact@buildsmart.com", phone: "+254 773 853 246", location: "Machakos, Kenya" },
    { name: "ComfortSpace", email: "contact@comfortspace.com", phone: "+254 735 674 832", location: "Kisumu, Kenya" },
    { name: "Dell Store", email: "contact@dell.com", phone: "+254 750 108 999", location: "Nairobi, Kenya" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.push("menu_screens/menu")}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
        <Text style={styles.headerText}>VENDORS</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput placeholder="Search vendors..." placeholderTextColor="#aaa" style={styles.searchInput} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {vendors.map((v, i) => (
          <View key={i} style={styles.vendorCard}>
            <Text style={styles.vendorName}>{v.name}</Text>
            <Text style={styles.vendorDetail}>{v.email}</Text>
            <Text style={styles.vendorDetail}>{v.phone}</Text>
            <Text style={styles.vendorLocation}>{v.location}</Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewText}>View Transactions</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.pageText}>← Page 1 of 3 →</Text>
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
  cubeIcon: { position: "absolute", right: 40, top: 40, width: 30, height: 30  },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 5 },
  searchBar: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  searchInput: { color: "#fff", height: 40 },
  vendorCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  vendorName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  vendorDetail: { color: "#aaa", marginVertical: 2 },
  vendorLocation: { color: COLORS.primary, fontWeight: "600" },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  viewText: { color: "#fff", fontWeight: "600" },
  pageText: { color: "#aaa", textAlign: "center", marginTop: 20 },
});
