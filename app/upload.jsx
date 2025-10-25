import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions,
    Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { height } = Dimensions.get("window");

export default function Upload() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);

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
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
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
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to open gallery");
        }
    };

    const handleProceed = async () => {
        if (!selectedImage) {
            Alert.alert("Photo Required", "Please upload an organization photo before proceeding");
            return;
        }

        try{
            await AsyncStorage.setItem('organizationPhoto', selectedImage);
            router.push("/profile-setup");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
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

            {/* Logo */}
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>UPLOAD ORGANIZATION PHOTO</Text>

            {/* Upload Circle */}
            <TouchableOpacity
                style={styles.uploadCircle}
                onPress={showImagePickerOptions}
                activeOpacity={0.8}
            >
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.uploadedImage}
                    />
                ) : (
                    <View style={styles.uploadIconContainer}>
                        <Text style={styles.uploadIcon}>📷</Text>
                        <Text style={styles.uploadPlus}>+</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Proceed Button */}
            <TouchableOpacity
                style={styles.proceedButton}
                onPress={handleProceed}
                activeOpacity={0.8}
            >
                <Text style={styles.proceedButtonText}>PROCEED</Text>
            </TouchableOpacity>
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
        marginBottom: 30,
    },
    title: {
        color: "#FFA500",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 50,
        letterSpacing: 1,
    },
    uploadCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 60,
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
        marginTop: 100,
    },
    proceedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
});