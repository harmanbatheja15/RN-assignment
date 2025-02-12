import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View className='flex-1 items-center justify-center p-5'>
				<Text className='text-3xl font-bold'>This screen doesn't exist.</Text>
				<Link href='/' className='mt-[15px] py-[15px]'>
					<Text className='text-base text-[#0a7ea4]'>Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}
