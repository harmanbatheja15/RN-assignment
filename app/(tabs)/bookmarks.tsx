import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	Platform,
	StatusBar as RNStatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '@/components/Card';
import { Job } from '@/types';

export default function BookmarksScreen() {
	const statusBarHeight =
		Platform.OS === 'android' ? RNStatusBar.currentHeight : 0;

	const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const loadBookmarkedJobs = async () => {
		try {
			const savedBookmarks = await AsyncStorage.getItem('bookmarkedJobs');
			setBookmarkedJobs(savedBookmarks ? JSON.parse(savedBookmarks) : []);
		} catch (error) {
			setIsError(true);
			console.error('Error loading bookmarks:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadBookmarkedJobs();
	}, [bookmarkedJobs]);

	const renderItem = ({ item }: { item: Job }) => (
		<Card
			id={item.id}
			company_name={item.company_name || 'Company Not specified'}
			title={item.title || 'Job title not specified'}
			location={item?.primary_details?.Place || 'Remote'}
			salary={item?.primary_details?.Salary || 'Not specified'}
			phone={item.whatsapp_no || 'Not specified'}
			image={item.creatives?.[0].thumb_url}
		/>
	);

	if (isError) {
		return (
			<View className='flex-1 bg-black justify-center items-center'>
				<Text className='text-2xl text-white'>
					Error fetching data...
				</Text>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View className='flex-1 bg-black justify-center items-center'>
				<ActivityIndicator size='large' color='#ffffff' />
			</View>
		);
	}

	if (bookmarkedJobs.length === 0) {
		return (
			<View className='flex-1 bg-black justify-center items-center'>
				<Text className='text-2xl text-white'>
					No bookmarked jobs yet.
				</Text>
			</View>
		);
	}

	return (
		<View
			className='flex-1 bg-black'
			style={{ paddingTop: statusBarHeight }}
		>
			<FlatList
				data={bookmarkedJobs}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className='h-4 w-full' />}
				contentContainerClassName='p-4'
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
