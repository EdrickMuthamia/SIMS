import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Image,
  Animated,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { COLORS } from "../../constants/theme";

export default function Requests() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [searchQuery, setSearchQuery] = useState("");
  const [recents, setRecents] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/requests`);
      const allRequests = response.data;

      const recent = allRequests.filter((r) => r.status === "PENDING");
      const past = allRequests.filter((r) => r.status !== "PENDING");

      setRecents(recent);
      setHistory(past);
    } catch (err) {
      console.error("Failed to fetch requests:", err.message);
      Alert.alert("Error", "Could not load requests.");
    }
  };

  const handleStatusChange = async (section, index, newStatus) => {
    const list = section === "recents" ? recents : history;
    const request = list[index];

    try {
      await axios.patch(`${API_BASE_URL}/requests/${request.request_id}`, {
        status: newStatus,
      });

      const updated = [...list];
      updated[index].status = newStatus;

      if (section === "recents") {
        const updatedRecents = updated.filter((r) => r.status === "PENDING");
        const updatedHistory = [...history, ...updated.filter((r) => r.status !== "PENDING")];
        setRecents(updatedRecents);
        setHistory(updatedHistory);
      } else {
        setHistory(updated);
      }
    } catch (err) {
      console.error("Failed to update status:", err.message);
      Alert.alert("Error", "Failed to update status");
    }
  };

  const filterBySearch = (list) =>
    list.filter((item) =>
      item.item_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderCard = (req, index, section) => (
    <View key={req.request_id || index} style={styles.card}>
      <Text style={styles.itemText}>SERIAL ID: {req.serial_id || "—"}</Text>
      <Text style={styles.itemText}>ITEM: {req.item_name || "—"}</Text>
      <Text style={styles.itemText}>REQUESTED BY: {req.requester || req.user_id || "—"}</Text>
      <Text style={styles.itemText}>DUE DATE: {req.due_date?.slice(0, 10) || "—"}</Text>
      {req.status && (
        <Text style={[styles.itemText, { fontWeight: "bold" }]}>
          STATUS: {req.status}
        </Text>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.success }]}
          onPress={() => handleStatusChange(section, index, "APPROVED")}
        >
          <Text style={styles.buttonText}>APPROVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#FF3B3B" }]}
          onPress={() => handleStatusChange(section, index, "DENIED")}
        >
          <Text style={styles.buttonText}>DECLINE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Animated.View
            style={[styles.logoCircle, { transform: [{ scale: pulseAnim }] }]}
          >
            <Image
              source={require("../../assets/splash-icon.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Text style={styles.headerText}>REQUESTS</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={COLORS.grey}
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.sectionLabel}>RECENTS</Text>
        {filterBySearch(recents).map((req, index) =>
          renderCard(req, index, "recents")
        )}

        <Text style={styles.sectionLabel}>REQUEST HISTORY</Text>
        {filterBySearch(history).map((req, index) =>
          renderCard(req, index, "history")
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: "center",
  },
  headerTop: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(216, 161, 180, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    marginTop: 15,
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  searchBar: {
    marginVertical: 15,
    alignItems: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    color: COLORS.black,
    fontWeight: "600",
  },
  scroll: { paddingHorizontal: 15 },
  sectionLabel: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  itemText: {
    color: COLORS.white,
    fontSize: 14,
    marginVertical: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});
