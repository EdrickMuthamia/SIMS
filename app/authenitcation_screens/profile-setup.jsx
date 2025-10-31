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
    Alert
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get("window");
const MAX_BIO_LENGTH = 500;

export default function ProfileSetup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const handleBack = () => {
        router.back();
    };

    const handleSetPassword = async () => {
        // Validation
        if (!name.trim()) {
            Alert.alert("Error", "Please enter your name");
            return;
        }

        if (!bio.trim()) {
            Alert.alert("Error", "Please enter a bio for your organization");
            return;
        }

        if (bio.trim().length < 10) {
            Alert.alert("Error", "Bio must be at least 10 characters long");
            return;
        }

        // Save to AsyncStorage
        try {
            await AsyncStorage.setItem('userName', name.trim());
            await AsyncStorage.setItem('organizationBio', bio.trim());

            // Navigate to password setup
            router.push("/authenitcation_screens/password-setup");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const showAlmostDone = name.trim().length > 0;

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
                <Text style={styles.title}>LETS GET TO KNOW YOU{'\n'}BETTER!</Text>

                {/* Form */}
                <View style={styles.formContainer}>
                    {/* Name Input */}
                    <Text style={styles.label}>What is your name?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Eg  John Doe"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    {/* Bio Input */}
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={styles.bioInput}
                        placeholder="Tell us about your organization..."
                        placeholderTextColor="#999"
                        value={bio}
                        onChangeText={(text) => {
                            if (text.length <= MAX_BIO_LENGTH) {
                                setBio(text);
                            }
                        }}
                        multiline
                        textAlignVertical="top"
                        maxLength={MAX_BIO_LENGTH}
                    />
                    <Text style={styles.charCount}>
                        {bio.length}/{MAX_BIO_LENGTH}
                    </Text>
                </View>

                {/* Almost Done Text - Only show when name is filled */}
                {showAlmostDone && (
                    <Text style={styles.almostDone}>Almost done...</Text>
                )}

                {/* Set Password Button */}
                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={handleSetPassword}
                    activeOpacity={0.8}
                >
                    <Text style={styles.passwordButtonText}>SET PASSWORD</Text>
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
        paddingBottom: 40,
    },
    backButton: {
        position: "absolute",
        top: height * 0.05,
        left: 20,
        zIndex: 10,
        padding: 8,
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: height * 0.06,
    },
    title: {
        color: "#FFA500",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 30,
        textAlign: "center",
        lineHeight: 28,
    },
    formContainer: {
        width: "100%",
        paddingHorizontal: 24,
        marginBottom: 10,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 12,
        marginTop: 15,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 14,
        color: "#000",
    },
    bioInput: {
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 14,
        color: "#000",
        height: 150,
        textAlignVertical: "top",
    },
    charCount: {
        color: "#999",
        fontSize: 12,
        textAlign: "right",
        marginTop: 5,
        marginRight: 5,
    },
    almostDone: {
        color: "#FFA500",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
    },
    passwordButton: {
        backgroundColor: "#FE005F",
        borderRadius: 25,
        paddingHorizontal: 50,
        paddingVertical: 15,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        marginTop: 30,
    },
    passwordButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
});