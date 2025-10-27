import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Loading() {
    const router = useRouter();
    const [currentPhase, setCurrentPhase] = useState(1); // 1, 2, or 3
    const spinValue = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Spin animation for the gradient ring
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();

        // Phase 1: "GETTING THINGS READY..." (0-2s)
        const timer1 = setTimeout(() => {
            setCurrentPhase(2);
        }, 2000);

        // Phase 2: "JUST A MINUTE OR TWO..." (2s-4s)
        const timer2 = setTimeout(() => {
            setCurrentPhase(3);
        }, 4000);

        // Phase 3: "READY !" (4s-7s, then navigate)
        const timer3 = setTimeout(() => {
            router.replace("/welcome_screens/home"); // Change to your white page route
        }, 7000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    useEffect ((callback) => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentPhase]);    
      

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const getMessage = () => {
        switch (currentPhase) {
            case 1:
                return "GETTING THINGS READY...";
            case 2:
                return "JUST A MINUTE OR TWO...";
            case 3:
                return "READY !";
            default:
                return "GETTING THINGS READY...";
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Animated Gradient Ring */}
            <Animated.View style={[styles.ringContainer, { transform: [{ rotate: spin }] }]}>
                <Svg width={200} height={200} viewBox="0 0 200 200">
                    <Defs>
                        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <Stop offset="12%" stopColor="#FE005F" />
                            <Stop offset="50%" stopColor="#FEB000" />
                            <Stop offset="83%" stopColor="#0080FC" />
                        </LinearGradient>
                    </Defs>
                    <Circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="440 20"
                    />
                </Svg>
            </Animated.View>

            {/* Loading Text with fade animation */}
            <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                <View style={styles.textBox}>
                    <Text style={styles.loadingText}>{getMessage()}</Text>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: "center",
        alignItems: "center",
    },
    ringContainer: {
        marginBottom: 60,
    },
    textContainer: {
        position: "absolute",
        bottom: height * 0.25,
        width: width * 0.8,
        alignItems: "center",
    },
    textBox: {
        backgroundColor: "rgba(40, 40, 40, 0.8)",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    loadingText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 1,
        textAlign: "center",
    },
});