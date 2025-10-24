import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

export default function Intro() {
    const router = useRouter();

    const handleNext = () => {
        router.replace("/home");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Card Image with Overlay */}
            <View style={styles.cardContainer}>
                <Image
                    source={require('../assets/organized.png')}
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

            {/* Next Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.nextButton}
                onPress={handleNext}
            >
                <Text style={styles.nextButtonText}>NEXT</Text>
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
        paddingVertical: height * 0.08,
    },
    cardContainer: {
        width: width * 1,
        height: height * 0.75,
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: height * 0.05,
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
        bottom: 70,
        backgroundColor: "#C4DAF3",
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: "85%",
        alignItems: "center",
        elevation: 1,
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
    nextButton: {
        backgroundColor: "#FE005F",
        paddingHorizontal: 60,
        paddingVertical: 14,
        borderRadius: 25,
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        marginBottom: 20,
    },
    nextButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 1,
    },
});