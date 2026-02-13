import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useAnchorStore } from '../store/useAnchorStore';

const COLORS = { SAFE: '#10B981', WARN: '#F59E0B', DANGER: '#EF4444' };

export const TimeGradient = ({ children }: { children: React.ReactNode }) => {
    const lastLogTime = useAnchorStore((state) => state.lastLogTime);
    const progress = useSharedValue(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diffMins = (Date.now() - lastLogTime) / 60000;
            let val = diffMins > 45 ? 1 : diffMins > 15 ? 0.5 + ((diffMins - 15) / 60) : (diffMins / 30);
            progress.value = withTiming(val, { duration: 1000 });
        }, 5000);
        return () => clearInterval(interval);
    }, [lastLogTime]);

    const animatedStyle = useAnimatedStyle(() => {
        return { backgroundColor: interpolateColor(progress.value, [0, 0.5, 1], [COLORS.SAFE, COLORS.WARN, COLORS.DANGER]) };
    });

    return <Animated.View style={[styles.fill, animatedStyle]}>{children}</Animated.View>;
};
const styles = StyleSheet.create({ fill: { flex: 1 } });
