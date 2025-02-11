import { useEffect } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	withSequence,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export function HelloWave() {
	const rotationAnimation = useSharedValue(0);

	useEffect(() => {
		rotationAnimation.value = withRepeat(
			withSequence(
				withTiming(25, { duration: 150 }),
				withTiming(0, { duration: 150 })
			),
			4 // Run the animation 4 times
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotationAnimation.value}deg` }],
	}));

	return (
		<Animated.View style={animatedStyle}>
			<ThemedText className='text-[28px] -mt-[6px] leading-8'>👋</ThemedText>
		</Animated.View>
	);
}
