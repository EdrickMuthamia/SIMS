import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
// Import Svg and its components needed
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const { height } = Dimensions.get("window");

// Spinner Component
const Spinner = ({ size = 500 }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 80 80">
            <Circle
                cx="40"
                cy="40"
                r="34"
                stroke="#FE005F"
                strokeWidth="6"
                fill="none"
                strokeDasharray="53 160"
                strokeLinecap="round"
            />
            <Circle
                cx="40"
                cy="40"
                r="34"
                stroke="#FFA500"
                strokeWidth="6"
                fill="none"
                strokeDasharray="53 160"
                strokeDashoffset="-53"
                strokeLinecap="round"
            />
            <Circle
                cx="40"
                cy="40"
                r="34"
                stroke="#2196F3"
                strokeWidth="6"
                fill="none"
                strokeDasharray="53 160"
                strokeDashoffset="-106"
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default function Onboarding() {
    const router = useRouter();
    const [showLanding, setShowLanding] = useState(false);

    const splashOpacity = useRef(new Animated.Value(1)).current;
    const landingOpacity = useRef(new Animated.Value(0)).current;
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Spinner rotation animation
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // 5 second splash delay
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(splashOpacity, { toValue: 0, duration: 600, useNativeDriver: true }),
                Animated.timing(landingOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
            ]).start(() => {
                setShowLanding(true);
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const handleExplore = () => {
        router.replace("/home");
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* SPLASH PAGE */}
            <Animated.View style={[styles.splash, { opacity: splashOpacity, zIndex: showLanding ? 0 : 1 }]}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Animated.View style={[styles.spinnerContainer, { transform: [{ rotate: spin }] }]}>
                    <Spinner size={100} />
                </Animated.View>
            </Animated.View>

            {/* LANDING PAGE (Modified Layout) */}
            <Animated.View style={[styles.landing, { opacity: landingOpacity, zIndex: showLanding ? 1 : 0 }]}>

                {/* Header (Absolute position near the top) */}
                <Text style={styles.headerAbsolute}>
                    WELCOME TO SMART FIXED{"\n"}ASSETS MANAGEMENT SYSTEM!
                </Text>

                {/* Center Block (Logo and Description, centered vertically) */}
                <View style={styles.centerBlock}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />

                    <Text style={styles.descriptionCentered}>
                        Track, manage, and optimize{"\n"}all your organizational assets{"\n"}effortlessly and securely.
                    </Text>
                </View>

                {/* Explore Button (Absolute position near the bottom) */}
                <TouchableOpacity activeOpacity={0.3} style={styles.exploreBtnAbsolute} onPress={handleExplore}>
                    <Text style={styles.exploreText}>EXPLORE US &gt;</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center",
        justifyContent: "center",
    },
    splash: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        width: 350,
        height: 350,
    },
    spinnerContainer: {
        position: "absolute",
        bottom: 60,
    },
    landing: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center", // Vertically centers the `centerBlock`
        paddingHorizontal: 24,
    },
    // Block containing the logo and description, centered vertically in the available space
    centerBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        // Increased marginBottom to push the content up slightly, away from the fixed button
        marginBottom: height * 0.08,
    },
    // Header positioned absolutely near the top
    headerAbsolute: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 26,
        position: 'absolute',
        top: height * 0.12, // Positioning based on 10% from the top
        width: '100%',
    },
    descriptionCentered: {
        color: "#ccc",
        fontSize: 24.5,
        textAlign: "center",
        marginTop: 30, // Space between logo and description
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    // Button positioned absolutely near the bottom
    exploreBtnAbsolute: {
        position: 'absolute',
        bottom: height * 0.05, // Positioning based on 5% from the bottom
        backgroundColor: "#FE005F",
        paddingHorizontal: 34,
        paddingVertical: 14,
        borderRadius: 20,
        elevation: 4,
        shadowColor: "#FF2D7A",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
    },
    exploreText: {
        color: "#fff",
        fontWeight: "700",
        letterSpacing: 1,
        fontSize: 20,
    },
});