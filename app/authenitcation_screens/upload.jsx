import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions,
    Platform,
    ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadFile } from '../../config/api';

const { height } = Dimensions.get("window");

export default function Upload() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Request permissions on mount
    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
                const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
                    Alert.alert('Permission Required', 'Sorry, we need camera and gallery permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleBack = () => {
        router.back();
    };

    const showImagePickerOptions = () => {
        Alert.alert(
            "Upload Photo",
            "Choose an option",
            [
                {
                    text: "Take Photo",
                    onPress: openCamera
                },
                {
                    text: "Choose from Gallery",
                    onPress: openGallery
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    const openCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0]);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to open camera");
        }
    };

    const openGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0]);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to open gallery");
        }
    };

    const handleProceed = async () => {
        let photoUrl = null;

        // If user selected an image, upload it first
        if (selectedImage) {
            setUploading(true);
            try {
                const fileName = `org-${Date.now()}.jpg`;
                const { response, data } = await uploadFile(selectedImage.uri, fileName);

                if (data.success) {
                    photoUrl = data.data.url;
                    console.log('Photo uploaded successfully:', photoUrl);
                } else {
                    Alert.alert("Upload Failed", "Failed to upload photo, but you can continue without it.");
                }
            } catch (error) {
                console.error('Upload error:', error);
                Alert.alert(
                    "Upload Error",
                    "Could not upload photo to server. Continue anyway?",
                    [
                        { text: "Go Back", style: "cancel" },
                        {
                            text: "Continue Without Photo",
                            onPress: () => proceedToNext(null)
                        }
                    ]
                );
                setUploading(false);
                return;
            } finally {
                setUploading(false);
            }
        }

        proceedToNext(photoUrl);
    };

    const proceedToNext = async (photoUrl) => {
        try {
            // Save photo URL to AsyncStorage
            await AsyncStorage.setItem('organizationPhoto', photoUrl || '');

            // Navigate to profile setup
            router.push("/authenitcation_screens/profile-setup");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const handleSkip = () => {
        Alert.alert(
            "Skip Photo Upload",
            "Are you sure you want to skip uploading an organization photo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Skip",
                    onPress: () => proceedToNext(null)
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Back Arrow */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
                activeOpacity={0.7}
                disabled={uploading}
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
            <Text style={styles.title}>UPLOAD ORGANIZATION PHOTO</Text>
            <Text style={styles.subtitle}>(Optional)</Text>

            {/* Upload Circle */}
            <TouchableOpacity
                style={styles.uploadCircle}
                onPress={showImagePickerOptions}
                activeOpacity={0.8}
                disabled={uploading}
            >
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={styles.uploadedImage}
                    />
                ) : (
                    <View style={styles.uploadIconContainer}>
                        <Text style={styles.uploadIcon}>📷</Text>
                        <Text style={styles.uploadPlus}>+</Text>
                    </View>
                )}
            </TouchableOpacity>

            {uploading && (
                <View style={styles.uploadingContainer}>
                    <ActivityIndicator size="large" color="#FE005F" />
                    <Text style={styles.uploadingText}>Uploading photo...</Text>
                </View>
            )}

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.proceedButton, uploading && styles.buttonDisabled]}
                    onPress={handleProceed}
                    activeOpacity={0.8}
                    disabled={uploading}
                >
                    <Text style={styles.proceedButtonText}>
                        {selectedImage ? 'UPLOAD & PROCEED' : 'PROCEED'}
                    </Text>
                </TouchableOpacity>

                {!selectedImage && (
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={handleSkip}
                        activeOpacity={0.8}
                        disabled={uploading}
                    >
                        <Text style={styles.skipButtonText}>SKIP FOR NOW</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
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
        marginBottom: 20,
    },
    title: {
        color: "#FFA500",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 5,
        letterSpacing: 1,
    },
    subtitle: {
        color: "#999",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    uploadCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        overflow: "hidden",
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 75,
    },
    uploadIconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    uploadIcon: {
        fontSize: 50,
        marginBottom: 5,
    },
    uploadPlus: {
        fontSize: 30,
        color: "#666",
        position: "absolute",
        bottom: -5,
        right: -5,
    },
    uploadingContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    uploadingText: {
        color: "#FFA500",
        fontSize: 14,
        marginTop: 10,
        fontStyle: "italic",
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 50,
    },
    proceedButton: {
        backgroundColor: "#FE005F",
        borderRadius: 25,
        paddingHorizontal: 60,
        paddingVertical: 14,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#FE005F",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        minWidth: 250,
    },
    proceedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
    skipButton: {
        marginTop: 20,
        paddingVertical: 10,
    },
    skipButtonText: {
        color: "#999",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});