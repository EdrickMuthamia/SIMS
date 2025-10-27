import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Delivered");
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newOrder, setNewOrder] = useState({
    name: "",
    vendor: "",
    date: "",
    arrivalDays: "",
  });

  const [orders, setOrders] = useState({
    Delivered: {
      recents: [
        { name: "MacBook Pro 16", vendor: "Apple Reseller", date: "20 Oct 2025", id: "#A3021", status: "Arrived: TODAY" },
        { name: "Lenovo ThinkPad", vendor: "TechZone", date: "19 Oct 2025", id: "#L9941", status: "Arrived: TODAY" },
      ],
      history: [
        { name: "Samsung Galaxy Tab", vendor: "GadgetWorld", date: "15 Oct 2025", id: "#S8921", status: "Delivered" },
        { name: "ASUS ROG Laptop", vendor: "ElectroHub", date: "12 Oct 2025", id: "#R1205", status: "Delivered" },
      ],
    },
    "In Transit": [
      { name: "Printer", vendor: "Kodak Store", date: "20 Oct 2025", id: "#A3021", status: "Arriving in: 2 DAYS" },
      { name: "Logitech MX Mouse", vendor: "TechWorld", date: "19 Oct 2025", id: "#L9941", status: "Arriving in: TOMORROW" },
      { name: "Power Drill", vendor: "Bosch Tools", date: "18 Oct 2025", id: "#D2025", status: "Arriving in: 3 DAYS" },
      { name: "Dell Monitor", vendor: "Dell Kenya", date: "17 Oct 2025", id: "#M5542", status: "Arriving in: 4 DAYS" },
    ],
  });

  const handleAddOrder = () => {
    if (!newOrder.name || !newOrder.vendor || !newOrder.date || !newOrder.arrivalDays) {
      alert("Please fill out all fields");
      return;
    }

    const newItem = {
      name: newOrder.name,
      vendor: newOrder.vendor,
      date: newOrder.date,
      id: `#${Math.floor(Math.random() * 10000)}`,
      status: `Arriving in: ${newOrder.arrivalDays} DAYS`,
    };

    setOrders((prev) => ({
      ...prev,
      "In Transit": [newItem, ...prev["In Transit"]],
    }));

    setShowModal(false);
    setNewOrder({ name: "", vendor: "", date: "", arrivalDays: "" });
    setActiveTab("In Transit");
  };

  const handleEditOrder = (index) => {
    const orderToEdit = orders["In Transit"][index];
    setNewOrder({
      name: orderToEdit.name,
      vendor: orderToEdit.vendor,
      date: orderToEdit.date,
      arrivalDays: orderToEdit.status.split(" ")[2],
    });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteOrder = (index) => {
    setOrders((prev) => ({
      ...prev,
      "In Transit": prev["In Transit"].filter((_, i) => i !== index),
    }));
  };

  const handleDone = () => {
    if (!newOrder.name || !newOrder.vendor || !newOrder.date || !newOrder.arrivalDays) {
      alert("Please fill out all fields");
      return;
    }

    const updatedOrder = {
      name: newOrder.name,
      vendor: newOrder.vendor,
      date: newOrder.date,
      id: editIndex !== null ? orders["In Transit"][editIndex].id : `#${Math.floor(Math.random() * 10000)}`,
      status: `Arriving in: ${newOrder.arrivalDays} DAYS`,
    };

    setOrders((prev) => {
      const updated = [...prev["In Transit"]];
      if (editIndex !== null) {
        updated[editIndex] = updatedOrder;
      } else {
        updated.unshift(updatedOrder);
      }
      return { ...prev, "In Transit": updated };
    });

    setShowModal(false);
    setEditIndex(null);
    setNewOrder({ name: "", vendor: "", date: "", arrivalDays: "" });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backArrow} onPress={() => router.push("menu_screens/menu")}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
        <Text style={styles.headerText}>ORDERS</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {["Delivered", "In Transit"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SEARCH + ADD BUTTON */}
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.addButton} onPress={() => { setShowModal(true); setEditIndex(null); }}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search..." placeholderTextColor="#aaa" style={styles.searchInput} />
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === "Delivered" ? (
          <>
            {/* Recents */}
            <Text style={styles.sectionHeader}>Recents</Text>
            {orders.Delivered.recents.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardVendor}>{item.vendor}</Text>
                <Text style={styles.cardText}>Purchase Date: {item.date}</Text>
                <Text style={styles.cardText}>Order ID: {item.id}</Text>
                <View style={[styles.statusTag, { backgroundColor: "#64D34E" }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            ))}

            {/* Order History */}
            <TouchableOpacity
              style={styles.historyHeader}
              onPress={() => setShowHistory(!showHistory)}
            >
              <Text style={styles.sectionHeader}>Order History</Text>
              <Text style={styles.toggleIcon}>{showHistory ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {showHistory &&
              orders.Delivered.history.map((item) => (
                <View key={item.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardVendor}>{item.vendor}</Text>
                  <Text style={styles.cardText}>Purchase Date: {item.date}</Text>
                  <Text style={styles.cardText}>Order ID: {item.id}</Text>
                  <View style={[styles.statusTag, { backgroundColor: "#D3C84E" }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              ))}
          </>
        ) : (
          <>
            {orders["In Transit"].map((item, index) => (
              <View key={item.id} style={styles.card}>
                {/* Edit/Delete Buttons */}
                <View style={styles.topRightButtons}>
                  <TouchableOpacity onPress={() => handleEditOrder(index)}>
                    <Text style={styles.textButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteOrder(index)}>
                    <Text style={[styles.textButton, { color: "red" }]}>Delete</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardVendor}>{item.vendor}</Text>
                <Text style={styles.cardText}>Purchase Date: {item.date}</Text>
                <Text style={styles.cardText}>Order ID: {item.id}</Text>
                <View style={[styles.statusTag, { backgroundColor: "#FF4C4C" }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* MODAL FOR ADD/EDIT ORDER */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editIndex !== null ? "Edit Order" : "Add New Order"}</Text>
            <TextInput
              placeholder="Item Name"
              placeholderTextColor="#aaa"
              style={styles.modalInput}
              value={newOrder.name}
              onChangeText={(text) => setNewOrder({ ...newOrder, name: text })}
            />
            <TextInput
              placeholder="Vendor"
              placeholderTextColor="#aaa"
              style={styles.modalInput}
              value={newOrder.vendor}
              onChangeText={(text) => setNewOrder({ ...newOrder, vendor: text })}
            />
            <TextInput
              placeholder="Purchase Date (e.g., 26 Oct 2025)"
              placeholderTextColor="#aaa"
              style={styles.modalInput}
              value={newOrder.date}
              onChangeText={(text) => setNewOrder({ ...newOrder, date: text })}
            />
            <TextInput
              placeholder="Arrives in (days)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              style={styles.modalInput}
              value={newOrder.arrivalDays}
              onChangeText={(text) => setNewOrder({ ...newOrder, arrivalDays: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#555" }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.primary }]}
                onPress={handleDone}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  header: {
  backgroundColor: COLORS.primary,
  borderRadius: 30,
  height: 170, 
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  },
  backArrow: { position: "absolute", top: 60, left: 25 },
  backText: { color: "#fff", fontSize: 26 },
  buildingIcon: { width: 80, height: 80, resizeMode: "contain" },
  cubeIcon: { position: "absolute", right: 25, top: 65, width: 40, height: 40, resizeMode: "contain" },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 5 },
  tabContainer: { flexDirection: "row", justifyContent: "center", gap: 10 },
  tabButton: { backgroundColor: "#222", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { color: "#888", fontWeight: "600" },
  activeText: { color: "#fff" },

  searchRow: { flexDirection: "row", alignItems: "center", marginVertical: 12, gap: 10 },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", fontSize: 24, marginTop: -2 },
  searchBar: { flex: 1, backgroundColor: "#1E1E1E", borderRadius: 12, paddingHorizontal: 12 },
  searchInput: { color: "#fff", height: 40 },

  sectionHeader: {
    color: "#FFD000",
    fontWeight: "light",
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    marginTop: 5,
    marginBottom: 10,
  },
  historyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  toggleIcon: { color: "#fff", fontSize: 16 },
  card: { backgroundColor: "#1E1E1E", borderRadius: 15, padding: 15, marginVertical: 10, position: "relative" },
  cardTitle: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
  textTransform: "uppercase",
},
  cardVendor: { color: COLORS.primary, marginBottom: 5 },
  cardText: { color: "#aaa" },

topRightButtons: {
  position: "absolute",
  right: 10,
  top: 10,
  flexDirection: "row",
  gap: 15,
},
textButton: {
  color: COLORS.primary,
  fontWeight: "700",
  fontSize: 15,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
  backgroundColor: "rgba(255,255,255,0.08)",
},

  statusTag: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  statusText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    width: "85%",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  modalInput: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    color: "#fff",
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 10,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalButton: { flex: 1, borderRadius: 10, paddingVertical: 10, marginHorizontal: 5, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "600" },
});
