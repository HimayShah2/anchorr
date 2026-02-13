import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAnchorStore } from '../store/useAnchorStore';

export default function Home() {
    const { currentAnchor, currentTarget, logAnchor, panicReset } = useAnchorStore();
    const [text, setText] = useState('');
    const [logging, setLogging] = useState(false);

    const handleLog = () => {
        if (!text.trim()) return;
        logAnchor(text);
        setText('');
        setLogging(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.safeArea}>

                {/* TEST - Simple text to verify app is loading */}
                <View style={styles.header}>
                    <Text style={styles.title}>ANCHOR APP</Text>
                    <Text style={styles.subtitle}>Current Target</Text>
                    <Text style={styles.targetText}>{currentTarget}</Text>
                </View>

                <View style={styles.anchorDisplay}>
                    <Text style={styles.label}>Last Anchor</Text>
                    <Text style={styles.anchorText}>"{currentAnchor}"</Text>
                </View>

                {logging ? (
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoFocus
                            value={text}
                            onChangeText={setText}
                            onSubmitEditing={handleLog}
                            style={styles.input}
                            placeholder="What did you just do?"
                        />
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => setLogging(true)} style={styles.logButton}>
                            <Text style={styles.buttonText}>Log Anchor</Text>
                        </Pressable>
                        <Pressable onPress={panicReset} style={styles.panicButton}>
                            <Text style={styles.panicText}>PANIC</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#10B981', // Green
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: Platform.OS === 'android' ? 48 : 54,
        justifyContent: 'space-between',
    },
    header: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    targetText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    anchorDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    anchorText: {
        color: 'white',
        fontSize: 36,
        fontWeight: '900',
        textAlign: 'center',
        opacity: 0.9,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        height: 80,
    },
    logButton: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    panicButton: {
        width: 80,
        backgroundColor: 'rgba(239,68,68,0.2)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    panicText: {
        color: '#FCA5A5',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 8,
    },
    input: {
        height: 56,
        paddingHorizontal: 16,
        fontSize: 20,
        color: 'black',
    },
});
