import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "../../constants/theme";

const ItemDetails = () => {
  const router = useRouter();
  const { id, name, details, image } = useLocalSearchParams();
  
  // Mock additional details with random borrowed status
  const isBorrowed = Math.random() > 0.5;
  const itemData = {
    id,
    name,
    details,
    image,
    status: isBorrowed ? "Borrowed" : "Available",
    serialNumber: "SN" + Math.random().toString().substr(2, 8),
    location: "Storage Room A",
    category: "Electronics",
    dateAdded: "2024-01-15",
    borrowedBy: isBorrowed ? "John Doe" : null,
    dueDate: isBorrowed ? "2024-12-30" : null
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('items_screens/items')}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ITEM DETAILS</Text>
        <Image source={require("../../assets/splash-icon.png")} style={styles.rightIcon} />
      </View>

      {/* Item Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: itemData.image }} style={styles.itemImage} />
      </View>

      {/* Item Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{itemData.name}</Text>
        
        <View style={styles.statusContainer}>
          <Text style={[
            styles.status, 
            itemData.status === "Available" ? styles.available : styles.borrowed
          ]}>
            {itemData.status}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{itemData.details}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Serial Number:</Text>
          <Text style={styles.value}>{itemData.serialNumber}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{itemData.location}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{itemData.category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date Added:</Text>
          <Text style={styles.value}>{itemData.dateAdded}</Text>
        </View>

        {itemData.borrowedBy && (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Borrowed By:</Text>
              <Text style={styles.value}>{itemData.borrowedBy}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.value}>{itemData.dueDate}</Text>
            </View>
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.borrowButton}>
          <Text style={styles.buttonText}>
            {itemData.status === "Available" ? "Borrow Item" : "Return Item"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 55,
    padding: 10,
  },
  backArrow: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    bottom: 10,
    right: 0,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    top: 15,
  },
  rightIcon: {
    width: 35,
    height: 35,
    position: "absolute",
    right: 25,
    top: 55,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  detailsContainer: {
    backgroundColor: "#2E2E2E",
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  itemName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  available: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  borrowed: {
    backgroundColor: "#F44336",
    color: "#fff",
  },
  detailRow: {
    marginBottom: 15,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    margin: 20,
  },
  borrowButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ItemDetails;