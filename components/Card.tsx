import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardProps, Job } from '@/types';
import { Link } from 'expo-router';

const getInitials = (name: string) => {
	const initials = name.match(/\b\w/g) || [];
	return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

const Card = ({
	id,
	company_name,
	title,
	location,
	salary,
	phone,
	image,
}: CardProps) => {
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		const checkBookmarkStatus = async () => {
			try {
				const savedBookmarks = await AsyncStorage.getItem(
					'bookmarkedJobs'
				);
				const bookmarks = savedBookmarks
					? JSON.parse(savedBookmarks)
					: [];
				setIsBookmarked(bookmarks.some((job: Job) => job.id === id));
			} catch (error) {
				console.error('Error checking bookmark status:', error);
			}
		};
		checkBookmarkStatus();
	}, [id]);

	const toggleBookmark = async () => {
		try {
			const savedBookmarks = await AsyncStorage.getItem('bookmarkedJobs');
			const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

			if (isBookmarked) {
				const updatedBookmarks = bookmarks.filter(
					(job: Job) => job.id !== id
				);
				await AsyncStorage.setItem(
					'bookmarkedJobs',
					JSON.stringify(updatedBookmarks)
				);
			} else {
				const newBookmark = {
					id,
					company_name,
					title,
					location,
					salary,
					whatsapp_no: phone,
					creatives: [{ thumb_url: image }],
					primary_details: { Place: location, Salary: salary },
				};
				const updatedBookmarks = [...bookmarks, newBookmark];
				await AsyncStorage.setItem(
					'bookmarkedJobs',
					JSON.stringify(updatedBookmarks)
				);
			}

			setIsBookmarked(!isBookmarked);
		} catch (error) {
			console.error('Error toggling bookmark:', error);
		}
	};

	return (
		<>
			<View className='w-full bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-800'>
				<View className='flex-row justify-between items-start'>
					<View className='flex-row items-center flex-1'>
						{image ? (
							<View className='w-16 h-16 rounded-xl border border-blue-500/20'>
								<Image
									source={{ uri: image }}
									className='w-full h-full rounded-xl'
								/>
							</View>
						) : (
							<View className='w-16 h-16 rounded-xl bg-blue-500/10 justify-center items-center border border-blue-500/20'>
								<Text className='text-lg font-bold text-blue-400'>
									{getInitials(company_name)}
								</Text>
							</View>
						)}
						<View className='ml-3 flex-1'>
							<Link
								href={{
									pathname: '/detail/[id]',
									params: { id: id },
								}}
								numberOfLines={2}
								className='h-auto'
							>
								<Text
									className='text-lg font-bold text-gray-50 leading-tight'
									numberOfLines={2}
								>
									{title}
								</Text>
							</Link>
							<Text className='text-base text-gray-400'>
								{company_name}
							</Text>
						</View>
					</View>
					<TouchableOpacity onPress={toggleBookmark} className='p-1'>
						<IconSymbol
							size={24}
							name={isBookmarked ? 'bookmark.fill' : 'bookmark'}
							color={isBookmarked ? '#60A5FA' : '#9CA3AF'}
						/>
					</TouchableOpacity>
				</View>

				<View className='mt-4 space-y-2'>
					<Text className='text-base text-gray-400'>{location}</Text>
					<Text className='text-base text-gray-400'>{salary}</Text>
				</View>

				<View className='mt-4 pt-4 border-t border-gray-800'>
					<Text className='text-base text-blue-400 font-medium'>
						{phone}
					</Text>
				</View>
			</View>
		</>
	);
};

export default Card;
