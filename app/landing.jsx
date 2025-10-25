import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default function Landing() {
    const router = useRouter();

    const handleBegin = () => {
        router.push("/signin");
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Back Arrow */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Card Image with Overlay */}
            <View style={styles.cardContainer}>
                <Image
                    source={require('../assets/landingpage.png')}
                    style={styles.cardImage}
                    resizeMode="contain"
                />

                {/* Overlay Card with Text */}
                <View style={styles.overlayCard}>
                    <Text style={styles.title}>STAY ORGANIZED</Text>
                    <Text style={styles.description}>
                        SFAMS empowers organizations to efficiently monitor and control their physical assets from acquisition to disposal.
                    </Text>
                </View>
            </View>

            {/* Begin Journey Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.beginButton}
                onPress={handleBegin}
            >
                <Text style={styles.beginButtonText}>BEGIN YOUR JOURNEY</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: height * 0.06,
    },
    backButton: {
        position: "absolute",
        top: height * 0.06,
        left: 20,
        zIndex: 10,
        padding: 8,
    },
    cardContainer: {
        width: width * 1.1,
        height: height * 0.7,
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: height * 0.08,
        position: "relative",
    },
    cardImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
    },
    overlayCard: {
        position: "absolute",
        bottom: 50,
        backgroundColor: "#C4DAF3",
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: "80%",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#000",
        marginBottom: 12,
        textAlign: "center",
    },
    description: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        lineHeight: 20,
    },
    beginButton: {
        backgroundColor: "#FE005F",
        paddingHorizontal: 50,
        paddingVertical: 14,
        borderRadius: 30,
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        marginBottom: 20,
    },
    beginButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 1,
    },
});