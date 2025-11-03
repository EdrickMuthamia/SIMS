import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Animated,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { COLORS } from "../../constants/theme";

const screenWidth = Dimensions.get("window").width;

export default function UserManagement() {
  const router = useRouter();
  const [scans, setScans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fadeAnims = useRef([]).current;
  const translateYs = useRef([]).current;

  const fetchScans = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user-management/scans`);
      const data = res.data || [];
      setScans(data);

      // Initialize animations
      fadeAnims.length = 0;
      translateYs.length = 0;
      data.forEach(() => {
        fadeAnims.push(new Animated.Value(0));
        translateYs.push(new Animated.Value(30));
      });

      // Animate in sequence
      const animations = data.map((_, i) =>
        Animated.parallel([
          Animated.timing(fadeAnims[i], {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(translateYs[i], {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      Animated.stagger(150, animations).start();
    } catch (err) {
      console.error("Failed to fetch scan history:", err.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchScans();
    }, [])
  );

  const filteredScans = scans.filter((scan) =>
    scan.item_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDeviceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "laptop":
        return require("../../assets/laptop-icon.png");
      case "desktop":
        return require("../../assets/desktop-icon.png");
      case "mouse":
        return require("../../assets/mouse-icon.png");
      default:
        return require("../../assets/laptop-icon.png");
    }
  };

  const getBadgeColor = (status) => {
    const normalized = status?.toUpperCase();
    if (normalized === "APPROVED") return COLORS.success;
    if (normalized === "PENDING") return COLORS.warning;
    if (normalized === "DENIED") return "#FF3B3B";
    return COLORS.grey;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.push("/home_screen")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/splash-icon.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerText}>USER MANAGEMENT</Text>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="SEARCH –"
          placeholderTextColor={COLORS.grey}
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.scanLabel}>SCAN HISTORY</Text>

      <TouchableOpacity onPress={fetchScans} style={styles.refreshButton}>
        <Text style={styles.refreshText}>↻ Refresh</Text>
      </TouchableOpacity>

      {/* SCAN HISTORY LIST */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {filteredScans.map((scan, i) => {
          const normalizedStatus = scan.status?.toUpperCase() || "UNKNOWN";
          const badgeColor = getBadgeColor(normalizedStatus);

          return (
            <Animated.View
              key={scan.scan_id || i}
              style={[
                styles.card,
                {
                  opacity: fadeAnims[i],
                  transform: [{ translateY: translateYs[i] }],
                },
              ]}
            >
              <View style={styles.iconCircle}>
                <Image
                  source={getDeviceIcon(scan.device_type)}
                  style={styles.deviceIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.deviceName}>{scan.item_name}</Text>
                <Text style={styles.metaText}>
                  SCANNED ON:{" "}
                  {scan.scanned_at
                    ? new Date(scan.scanned_at).toDateString()
                    : "Unknown"}
                </Text>
                <Text style={styles.metaText}>
                  SERIAL ID: {scan.serial_id || "N/A"}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.statusBadge, { backgroundColor: badgeColor }]}
                onPress={() => router.push("/status")}
              >
                <Text style={styles.statusText}>{normalizedStatus}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("scanner_screens/scan")}>
          <Image
            source={require("../../assets/scan-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("items_screens/items")}>
          <Image
            source={require("../../assets/home-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("user_screens/users")}>
          <Image
            source={require("../../assets/person-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
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
    marginTop: 50,
    paddingHorizontal: 20,
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
  scanLabel: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 20,
  },
  refreshButton: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  refreshText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  scrollArea: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    width: screenWidth * 0.85,
    height: 140,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  deviceIcon: {
    width: 24,
    height: 24,
  },
  cardContent: {
    flex: 1,
  },
  deviceName: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  metaText: {
    color: COLORS.white,
    fontSize: 12,
    marginBottom: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcon: {
    width: 26,
    height: 26,
    tintColor: COLORS.white,
  },
});
