import { StyleSheet, Text, View } from "react-native";

const home = () => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}

export default home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});