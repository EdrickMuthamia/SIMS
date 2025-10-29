import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

const screenWidth = Dimensions.get("window").width;

export default function OrganizationDetails() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [companyLogo, setCompanyLogo] = useState(null); 

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

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
  }, []);

  const uploadLogo = () => {
    
    setCompanyLogo(require("../../assets/company-logo.png")); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
          
            <TouchableOpacity style={styles.menuIcon} onPress={() => router.push("/menu")}>
              <Text style={styles.menuLine}>☰</Text>
            </TouchableOpacity>

         
            <TouchableOpacity onPress={uploadLogo} style={styles.logoWrapper}>
              <Animated.View
                style={[
                  styles.logoCircle,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Image
                  source={
                    companyLogo
                      ? companyLogo
                      : require("../../assets/icon.png") 
                  }
                  style={styles.headerIcon}
                  resizeMode="contain"
                />
                <View style={styles.cameraOverlay}>
                  <Image
                    source={require("../../assets/camera-icon.png")}
                    style={styles.cameraIcon}
                    resizeMode="contain"
                  />
                </View>
              </Animated.View>
            </TouchableOpacity>

            <Image
              source={require("../../assets/splash-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.headerText}>ORGANIZATIONS DETAILS</Text>
        </View>

        <View style={styles.cardsContainer}>
          {["REQUESTS", "USER MANAGEMENT", "ITEMS"].map((label) => (
            <Animated.View
              key={label}
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() =>
                  router.push(
                    label === "REQUESTS"
                      ? "/home_screen/requests"
                      : label === "USER MANAGEMENT"
                      ? "/home_screen/userManagement"
                      : "/home_screen/items"
                  )
                }
              >
                <Text style={styles.cardText}>{label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray || "#1E1E1E",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 30,
  },
  header: {
    backgroundColor: COLORS.primary || "#D4145A",
    borderRadius: 20, 
    paddingTop: 40,
    paddingBottom: 40,
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  headerTop: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuIcon: {
    paddingHorizontal: 10,
  },
  menuLine: {
    fontSize: 24,
    color: "#fff",
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoWrapper: {
    position: "relative",
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
  cameraOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
  },
  cameraIcon: {
    width: 16,
    height: 16,
  },
  headerText: {
    marginTop: 15,
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    textTransform: "uppercase",
  },
  cardsContainer: {
    marginTop: 40,
    alignItems: "center",
    gap: 25,
  },
  card: {
    width: screenWidth * 0.85,
    height: 150,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },
  cardTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    letterSpacing: 1,
  },
});
