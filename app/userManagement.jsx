import React, { useEffect, useRef } from "react";
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
import { COLORS } from "../constants/theme";

const screenWidth = Dimensions.get("window").width;

export default function UserManagement() {
  const router = useRouter();

  const users = [
    {
      serial: "0940FB0",
      name: "LENOVO IDEAPAD",
      status: "PENDING",
      date: "2 Oct 2023",
      icon: require("../assets/laptop-icon.png"),
    },
    {
      serial: "0940FB0",
      name: "DELL G16 7630",
      status: "DENIED",
      date: "10 Mar 2024",
      icon: require("../assets/desktop-icon.png"),
    },
    {
      serial: "0940FB0",
      name: "PREDATOR PRO M612",
      status: "APPROVED",
      date: "17 Apr 2025",
      icon: require("../assets/mouse-icon.png"),
    },
  ];

  const fadeAnims = useRef(users.map(() => new Animated.Value(0))).current;
  const translateYs = useRef(users.map(() => new Animated.Value(30))).current;

  useEffect(() => {
    const animations = users.map((_, i) =>
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
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.logoCircle}>
            <Image
              source={require("../assets/splash-icon.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerText}>USER MANAGEMENT</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="SEARCH –"
          placeholderTextColor={COLORS.grey}
          style={styles.input}
        />
      </View>

      {/* Scan History Label */}
      <Text style={styles.scanLabel}>SCAN HISTORY</Text>

      {/* Cards */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {users.map((user, i) => (
          <Animated.View
            key={i}
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
                source={user.icon}
                style={styles.deviceIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.deviceName}>{user.name}</Text>
              <Text style={styles.metaText}>SCANNED ON: {user.date}</Text>
              <Text style={styles.metaText}>SERIAL ID: {user.serial}</Text>
            </View>
            <View style={styles.cardRight}>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      user.status === "APPROVED"
                        ? COLORS.success
                        : user.status === "PENDING"
                        ? COLORS.warning
                        : "#FF3B3B", // red for DENIED
                  },
                ]}
              >
                <Text style={styles.statusText}>{user.status}</Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Image
            source={require("../assets/scan-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/home-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/person-icon.png")}
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
  cardRight: {
    marginLeft: 10,
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
