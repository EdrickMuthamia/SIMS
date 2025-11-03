import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get("window");

export default function SignUp() {
    const router = useRouter();
    const [organizationName, setOrganizationName] = useState("");
    const [organizationLocation, setOrganizationLocation] = useState("");

    const handleBack = () => {
        router.back();
    };

    const handleContinue = async () => {
        // Validation
        if (!organizationName.trim()) {
            Alert.alert("Error", "Please enter your organization name");
            return;
        }

        if (!organizationLocation.trim()) {
            Alert.alert("Error", "Please enter your organization location");
            return;
        }

        // Save to AsyncStorage
        try {
            await AsyncStorage.setItem('organizationName', organizationName.trim());
            await AsyncStorage.setItem('organizationLocation', organizationLocation.trim());
            await AsyncStorage.setItem('setupComplete', 'true');
            // Navigate to upload page
            router.push("/authenitcation_screens/upload");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back Arrow */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                {/* Logo */}
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Title */}
                <Text style={styles.title}>SETUP YOUR ORGANIZATION!</Text>

                {/* Form */}
                <View style={styles.formContainer}>
                    {/* Organization Name */}
                    <Text style={styles.label}>What is the name of your organization?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g  Telkom"
                        placeholderTextColor="#999"
                        value={organizationName}
                        onChangeText={setOrganizationName}
                        autoCapitalize="words"
                    />

                    {/* Organization Location */}
                    <Text style={styles.label}>Where is the organization located?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g Nairobi, Kenya"
                        placeholderTextColor="#999"
                        value={organizationLocation}
                        onChangeText={setOrganizationLocation}
                        autoCapitalize="words"
                    />
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleContinue}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueButtonText}>CONTINUE WITH SETUP</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: height * 0.05,
    },
    backButton: {
        position: "absolute",
        top: height * 0.05,
        left: 20,
        zIndex: 10,
        padding: 8,
    },
    logo: {
        width: 180,
        height: 180,
        marginTop: height * 0.06,
    },
    title: {
        color: "#FFA500",
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 40,
        textAlign: "center",
    },
    formContainer: {
        width: "100%",
        paddingHorizontal: 24,
        marginBottom: 30,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 12,
        marginTop: 20,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 14,
        color: "#000",
    },
    continueButton: {
        backgroundColor: "#FE005F",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        marginTop: 150,
    },
    continueButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
});