import React from 'react';
import { View, Text, ScrollView, Pressable, Modal, StyleSheet } from 'react-native';
import { useAnchorStore } from '../store/useAnchorStore';

export const HistoryViewer = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const { history, clearHistory } = useAnchorStore();
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>Trace</Text>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.scrollArea}>
                    {history.map((entry) => (
                        <View key={entry.id} style={styles.entryRow}>
                            <Text style={styles.timeText}>
                                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <View style={[
                                styles.entryCard,
                                entry.type === 'RESET' ? styles.resetCard : styles.normalCard
                            ]}>
                                <Text style={styles.entryText}>{entry.content}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Pressable onPress={clearHistory} style={styles.clearButton}>
                    <Text style={styles.clearText}>Clear Memory</Text>
                </Pressable>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.95)',
        paddingHorizontal: 24,
        paddingTop: 64,
        paddingBottom: 40,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        paddingBottom: 16,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
    },
    closeText: {
        color: 'white',
    },
    scrollArea: {
        flex: 1,
    },
    entryRow: {
        marginBottom: 16,
        flexDirection: 'row',
    },
    timeText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontFamily: 'monospace',
        width: 64,
        paddingTop: 4,
        marginRight: 12,
        textAlign: 'right',
    },
    entryCard: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    resetCard: {
        backgroundColor: 'rgba(153,27,27,0.4)',
        borderColor: '#EF4444',
    },
    normalCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    entryText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
    },
    clearButton: {
        marginTop: 24,
        alignSelf: 'center',
    },
    clearText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        textTransform: 'uppercase',
    },
});
