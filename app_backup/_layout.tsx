import { View, Text } from "react-native";

export default function RootLayout() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#10B981' }}>
            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>ANCHOR WORKS!</Text>
        </View>
    );
}
