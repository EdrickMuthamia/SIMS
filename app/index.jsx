
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const menuItems = [
    { label: 'Account & Settings', icon: require('../assets/icons/user.png'), route: '/settings/acc&settings' },
    { label: 'Security', icon: require('../assets/icons/security.png'), route: '/settings/security' },
    { label: 'Notifications', icon: require('../assets/icons/bell.png'), route: '/settings/notifications' },
    { label: 'Privacy', icon: require('../assets/icons/shield .png'), route: '/settings/privacy' },
    { label: 'Search History', icon: require('../assets/icons/info.png'), route: '/settings/search-history' },
    { label: 'Terms & Conditions', icon: require('../assets/icons/info.png'), route: '/settings/terms' },
    { label: 'Help & Support', icon: require('../assets/icons/info.png'), route: '/settings/help' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SFAMS</Text>
      </View>
      <View style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => router.push(item.route)}
            activeOpacity={0.7}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
=======
import  { useEffect, useRef, useState } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {filteredUsers.map((user, i) => (
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
            <TouchableOpacity
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    user.status === "APPROVED"
                      ? COLORS.success
                      : user.status === "PENDING"
                      ? COLORS.warning
                      : "#FF3B3B",
                },
              ]}
              onPress={() => router.push("/status")}
            >
              <Text style={styles.statusText}>{user.status}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

     
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/scan")}>
          <Image
            source={require("../assets/scan-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image
            source={require("../assets/home-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/user_screens/users")}>
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

  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#FE005F',
    paddingVertical: 40,
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: '#FFFF00',
  },
  headerText: {
    color: '#FFFF00',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    tintColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',

  container: { flex: 1, backgroundColor: COLORS.black },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 30,
    marginTop:50,
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
