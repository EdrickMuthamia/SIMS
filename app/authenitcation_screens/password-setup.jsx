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

export default function ProfileSetup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleDone = async () => {
        // Email validation
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        // Password validation
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Please enter both password fields");
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert("Error", "Password must be at least 8 characters long");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            Alert.alert(
                "Weak Password",
                "Password must contain:\n• At least 8 characters\n• 1 uppercase letter\n• 1 lowercase letter\n• 1 number\n• 1 special character (@$!%*?&#)"
            );
            return;
        }

        // Confirm password match
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        // Save to AsyncStorage
        try {
            await AsyncStorage.setItem('userEmail', email.trim());
            await AsyncStorage.setItem('userPassword', newPassword);
            await AsyncStorage.setItem('accountSetupComplete', 'true');

            // Navigate to next screen (you'll tell me which one)
            Alert.alert("Success", "Account setup complete!", [
                {
                    text: "OK",
                    onPress: () => {
                        router.replace("/welcome_screens/loading");
                    }
                }
            ]);
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
                <Text style={styles.title}>PROTECT YOUR ACCOUNT</Text>

                {/* Form */}
                <View style={styles.formContainer}>
                    {/* Email Input */}
                    <Text style={styles.label}>
                        Please provide your email <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g  john@mail.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />

                    {/* New Password Input */}
                    <Text style={styles.label}>Create new Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="E.g  huMIXCUITIHe"
                            placeholderTextColor="#999"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showNewPassword ? "eye-off" : "eye"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password Input */}
                    <Text style={styles.label}>Confirm new Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="E.g  huMIXCUITIHe"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showConfirmPassword ? "eye-off" : "eye"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Done Button */}
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={handleDone}
                    activeOpacity={0.8}
                >
                    <Text style={styles.doneButtonText}>DONE</Text>
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
        fontSize: 20,
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
    required: {
        color: "#FE005F",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 14,
        color: "#000",
    },
    passwordContainer: {
        backgroundColor: "#fff",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    passwordInput: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },
    eyeIcon: {
        padding: 5,
    },
    doneButton: {
        backgroundColor: "#FE005F",
        borderRadius: 25,
        paddingHorizontal: 80,
        paddingVertical: 15,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        marginTop: 20,
    },
    doneButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
});