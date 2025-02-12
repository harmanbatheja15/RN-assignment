import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetailScreen() {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			title: 'Job Detail',
			headerStyle: {
				paddingTop: 0,
				backgroundColor: 'black',
			},
			headerTintColor: 'white',
			headerBackTitle: 'Back',
			headerTitleStyle: {
				color: 'white',
			},
		});
	}, [navigation]);

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='flex-1 bg-black'
			>
				<View className='bg-black'>
					<View className='bg-[#262626] p-4'>
						<View>
							<View className='flex-row items-center justify-between gap-4'>
								<Image
									source={{
										uri: 'https://creatives.getlokalapp.com/cache/e2/77/e277823ddb606daca9b148b786a5de3e.jpg',
									}}
									className='w-14 h-14 rounded-full mb-4'
								/>
								<TouchableOpacity
									activeOpacity={0.8}
									className='px-4 py-2 bg-[#333333] border border-gray-500 rounded-2xl'
								>
									<Text className='text-white font-semibold'>
										Apply
									</Text>
								</TouchableOpacity>
							</View>
							<Text className='text-white text-xl font-bold'>
								Satyam Home Care Services wants nannies and ward
								boys for patient care, housework and cooking.
							</Text>
							<Text className='text-white text-lg font-medium mt-2'>
								at Satyam Home Care Services • Full time
							</Text>
						</View>
						<View>
							<Text className='text-gray-300 text-lg mt-4'>
								Location
							</Text>
							<Text className='text-white text-lg'>
								Hyderabad, India
							</Text>
						</View>
						<View className='flex-row items-center justify-between gap-8'>
							<View>
								<Text className='text-gray-300 text-lg mt-4'>
									Experience
								</Text>
								<Text className='text-white text-lg'>
									2+ years
								</Text>
							</View>
							<View className='mr-4'>
								<Text className='text-gray-300 text-lg mt-4'>
									Salary
								</Text>
								<Text className='text-white text-lg'>
									₹18000 - ₹25000+
								</Text>
							</View>
						</View>
					</View>
					<View className='p-4'>
						<Text className='font-semibold text-white text-lg'>
							About this Opportunity
						</Text>
						<Text className='text-white text-sm mt-2'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Sint consequuntur, minima doloribus molestiae
							accusantium perferendis iste, doloremque fuga
							laboriosam praesentium eaque distinctio commodi iure
							asperiores dicta iusto! Modi fugit voluptas mollitia
							fugiat quos in sit labore repudiandae quae expedita
							ut aspernatur soluta ex nihil, saepe ipsam, nulla
							accusamus commodi? Laudantium!
						</Text>
						<Text className='text-white text-sm mt-2'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Sint consequuntur, minima doloribus molestiae
							accusantium perferendis iste, doloremque fuga
							laboriosam praesentium eaque distinctio commodi iure
							asperiores dicta iusto!
						</Text>
						<Text className='text-white text-sm mt-2'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Sint consequuntur, minima doloribus molestiae
							accusantium perferendis iste, doloremque fuga
							laboriosam praesentium eaque distinctio commodi iure
							asperiores dicta iusto!
						</Text>
					</View>
				</View>
			</ScrollView>
		</>
	);
}
