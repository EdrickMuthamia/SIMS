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
    ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS, saveAuthData } from '../../config/api';

const { height } = Dimensions.get("window");

export default function PasswordSetup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {
            // Get all data from AsyncStorage
            const organizationName = await AsyncStorage.getItem('organizationName');
            const organizationLocation = await AsyncStorage.getItem('organizationLocation');
            const organizationPhoto = await AsyncStorage.getItem('organizationPhoto');
            const userName = await AsyncStorage.getItem('userName');
            const organizationBio = await AsyncStorage.getItem('organizationBio');

            // Validate all required data
            if (!organizationName || !organizationLocation || !userName || !organizationBio) {
                Alert.alert("Error", "Missing registration data. Please start signup again.");
                router.replace("/authenitcation_screens/signup");
                return;
            }

            console.log('Sending signup request with data:', {
                organizationName,
                organizationLocation,
                hasPhoto: !!organizationPhoto,
                userName,
                email: email.toLowerCase().trim()
            });

            // Call signup API
            const response = await fetch(API_ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organizationName: organizationName.trim(),
                    organizationLocation: organizationLocation.trim(),
                    organizationPhoto: organizationPhoto || null,
                    userName: userName.trim(),
                    organizationBio: organizationBio.trim(),
                    email: email.toLowerCase().trim(),
                    password: newPassword
                })
            });

            const data = await response.json();
            console.log('Signup response:', data);

            if (data.success) {
                // Save auth data
                await saveAuthData(data.data);

                // Clear temporary signup data
                await AsyncStorage.multiRemove([
                    'organizationName',
                    'organizationLocation',
                    'organizationPhoto',
                    'userName',
                    'organizationBio'
                ]);

                // Show success message
                Alert.alert(
                    "Registration Successful!",
                    `Welcome ${data.data.user.name}! Your account has been created.`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                router.replace("/welcome_screens/loading");
                            }
                        }
                    ]
                );
            } else {
                // Show error from server
                Alert.alert("Registration Failed", data.message || "Unable to create account");
            }

        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert(
                "Connection Error",
                "Unable to connect to server. Please check your internet connection and try again.\n\nError: " + error.message
            );
        } finally {
            setLoading(false);
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
                    disabled={loading}
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
                        editable={!loading}
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
                            editable={!loading}
                        />
                        <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            style={styles.eyeIcon}
                            disabled={loading}
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
                            editable={!loading}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                            disabled={loading}
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
                    style={[styles.doneButton, loading && styles.doneButtonDisabled]}
                    onPress={handleDone}
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.doneButtonText}>DONE</Text>
                    )}
                </TouchableOpacity>

                {loading && (
                    <Text style={styles.loadingText}>Creating your account...</Text>
                )}
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
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        marginTop: 20,
        minHeight: 50,
    },
    doneButtonDisabled: {
        opacity: 0.6,
    },
    doneButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
    loadingText: {
        color: "#FFA500",
        fontSize: 14,
        marginTop: 20,
        fontStyle: "italic",
    },
});