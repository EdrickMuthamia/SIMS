import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to onboarding on app start
        const timer = setTimeout(() => {
            router.replace("/onboarding");
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <ActivityIndicator size="large" color="#FF1493" />
        </View>
    );
};

export default Index;