import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker"; // ✅ only one import
import { COLORS } from "../../constants/theme";

const Items = () => {
  const router = useRouter();

  // Search and Form States
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // New Item Form Inputs
  const [newItemName, setNewItemName] = useState("");
  const [newItemDetails, setNewItemDetails] = useState("");
  const [newSerialNumber, setNewSerialNumber] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStatus, setNewStatus] = useState("Available");
  const [newImage, setNewImage] = useState(null);

  // Sample Items
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Lenovo IdeaPad Slim 3 14IHRIO",
      details:
        "Intel Core i5 13420H, 16GB DDR5 4800 (Up to 24GB Support), 512GB SSD",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    },
    {
      id: "2",
      name: "DELL G16 7630",
      details:
        'Intel Core i9-13900HX | RTX 4060 8GB | 16GB RAM 1TB SSD | 16" WQXGA 240Hz Display | Windows 11 Pro + Office 2021',
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    },
  ]);

  // 📸 Pick image from gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You need to grant permission to access photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setNewImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  // ➕ Add new item
  const addItem = () => {
    if (!newItemName.trim() || !newItemDetails.trim()) {
      Alert.alert("Missing Info", "Please fill in all the details.");
      return;
    }

    const newItem = {
      id: (items.length + 1).toString(),
      name: newItemName,
      details: newItemDetails,
      serial: newSerialNumber,
      location: newLocation,
      category: newCategory,
      status: newStatus,
      image: newImage || null,
    };

    setItems([...items, newItem]);
    setShowAddForm(false);
    setNewItemName("");
    setNewItemDetails("");
    setNewImage(null);
  };

  // 🔍 Filter items by name
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Item List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.details}</Text>
            </View>
          </View>
        )}
      />

      {/* Add Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(!showAddForm)}
      >
        <Text style={styles.addButtonText}>
          {showAddForm ? "Cancel" : "Add Item"}
        </Text>
      </TouchableOpacity>

      {/* Add Form */}
      {showAddForm && (
        <View style={styles.addForm}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newItemName}
            onChangeText={setNewItemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Details"
            value={newItemDetails}
            onChangeText={setNewItemDetails}
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick Image</Text>
          </TouchableOpacity>
          {newImage && <Image source={{ uri: newImage }} style={styles.previewImage} />}
          <TouchableOpacity style={styles.submitButton} onPress={addItem}>
            <Text style={styles.submitButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: COLORS.white },
  searchBar: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: { width: 100, height: 100, borderRadius: 10 },
  itemInfo: { flex: 1, padding: 10 },
  itemName: { fontWeight: "bold", fontSize: 16 },
  itemDetails: { color: COLORS.gray },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: { color: COLORS.white, fontWeight: "bold" },
  addForm: { marginTop: 15, padding: 10, backgroundColor: "#fafafa", borderRadius: 10 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  imagePicker: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  imagePickerText: { color: COLORS.white },
  previewImage: { width: 100, height: 100, borderRadius: 8, marginVertical: 5 },
  submitButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: { color: COLORS.white, fontWeight: "bold" },
});

export default Items;
