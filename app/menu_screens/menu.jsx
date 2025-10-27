import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

const { width, height } = Dimensions.get("window");

export default function MenuScreen() {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => router.push("/")}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Image source={require("../../assets/office-building.png")} style={styles.buildingIcon} />
        <Image source={require("../../assets/splash-icon.png")} style={styles.cubeIcon} />
        
        <Text style={styles.headerText}>ORGANIZATIONS DETAILS</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuContent}>
        {["Orders", "Vendors", "Settings", "History"].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.menuButton}
            onPress={() => router.push(`menu_screens/${item.toLowerCase()}`)}
          >
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },

  header: {
    backgroundColor: COLORS.primary,
    height: height * 0.28,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  closeIcon: { position: "absolute", top: 60, left: 25 },
  closeText: { color: "#fff", fontSize: 28 },
  buildingIcon: { width: 160, height: 120, resizeMode: "contain", marginTop: 10 },
  cubeIcon: { position: "absolute", right: 40, top: 65, width: 50, height: 50, resizeMode: "contain" },

  menuContent: {
    flex: 1,
    justifyContent: "center", // <-- Centers vertically
    alignItems: "center",
    gap: 20,
    marginTop: -40, // slight overlap for smooth transition
  },

  menuButton: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 8,
  },
  menuText: { fontSize: 18, fontWeight: "600", color: "#121212" },

  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 16 },

    headerText: {
    marginTop: 15,
    fontSize: 15,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    textTransform: "uppercase",
  },

});
