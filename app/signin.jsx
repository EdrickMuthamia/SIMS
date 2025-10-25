import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,Platform,ScrollView,Dimensions,Alert} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get("window");

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Check if user is already remembered
    useEffect(() => {
        checkRememberedUser();
    }, []);

    const checkRememberedUser = async () => {
        try {
            const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
            const rememberedPassword = await AsyncStorage.getItem('rememberedPassword');

            if (rememberedEmail && rememberedPassword) {
                setEmail(rememberedEmail);
                setPassword(rememberedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.log('Error checking remembered user:', error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    const handleLogin = async () => {
        // Basic validation
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password.length < 8) {
            Alert.alert("Error", "Password must be atleast 8 charaacters long");
            return;
        }

        if (!passwordRegex.test(password)) {
            Alert.alert(
                "Weak Password",
                "Password must contain:\n• At least 8 characters\n• 1 uppercase letter\n• 1 lowercase letter\n• 1 number\n• 1 special character (@$!%*?&)"
            );
            return;
        }

        // Remember user if checkbox is checked
        try {
            if (rememberMe) {
                await AsyncStorage.setItem('rememberedEmail', email);
                await AsyncStorage.setItem('rememberedPassword', password);
            } else {
                await AsyncStorage.removeItem('rememberedEmail');
                await AsyncStorage.removeItem('rememberedPassword');
            }

            // Store user session
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('isLoggedIn', 'true');

            // Navigate to home
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const handleSignUp = () => {
        // Will navigate to sign up page later
        Alert.alert("Coming Soon", "Sign up feature will be available soon!");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
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
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Welcome Text */}
                <Text style={styles.welcomeText}>WELCOME BACK !</Text>

                {/* Sign In Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>SIGN IN</Text>

                    {/* Email Input */}
                    <Text style={styles.label}>ENTER YOUR EMAIL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E.g johndoe@mail.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />

                    {/* Password Input */}
                    <Text style={styles.label}>ENTER YOUR PASSWORD</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="E.g huMIXCUITIHe"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Remember Me & Forgot Password */}
                    <View style={styles.optionsRow}>
                        <TouchableOpacity
                            style={styles.rememberMeContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                {rememberMe && (
                                    <Ionicons name="checkmark" size={16} color="#fff" />
                                )}
                            </View>
                            <Text style={styles.rememberMeText}>Remember Me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Alert.alert("Coming Soon", "Password reset feature coming soon!")}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <TouchableOpacity onPress={handleSignUp} style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>
                            Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    welcomeText: {
        color: "#FFA500",
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 30,
    },
    formContainer: {
        width: "100%",
        paddingHorizontal: 24,
    },
    formTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 25,
    },
    label: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 8,
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
    optionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 25,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#fff",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxChecked: {
        backgroundColor: "#666",
        borderColor: "#666",
    },
    rememberMeText: {
        color: "#fff",
        fontSize: 13,
    },
    forgotPassword: {
        color: "#fff",
        fontSize: 13,
    },
    loginButton: {
        backgroundColor: "#FE005F",
        borderRadius: 25,
        paddingHorizontal: 3,
        paddingVertical: 15,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
    signUpContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    signUpText: {
        color: "#fff",
        fontSize: 14,
    },
    signUpLink: {
        color: "#FE005F",
        fontWeight: "700",
    },
});