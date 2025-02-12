import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	Platform,
	StatusBar as RNStatusBar,
} from 'react-native';
import axios from 'axios';
import Card from '@/components/Card';
import { Job } from '@/types';

export default function HomeScreen() {
	const statusBarHeight =
		Platform.OS === 'android' ? RNStatusBar.currentHeight : 0;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [data, setData] = useState<Job[]>([]);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const fetchData = async (
		pageNumber: number,
		isLoadingMoreData: boolean = false
	) => {
		if (isLoadingMoreData) {
			setIsLoadingMore(true);
		} else {
			setIsLoading(true);
		}
		setIsError(false);

		try {
			const response = await axios.get<{ results: Job[] }>(
				`https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`
			);
			if (response.data.results.length === 0) {
				setHasMore(false);
			} else {
				setData((prevData) =>
					isLoadingMoreData
						? [...prevData, ...response.data.results]
						: response.data.results
				);
			}
		} catch (error) {
			setIsError(true);
			console.error('Error fetching data: ', error);
		} finally {
			setIsLoading(false);
			setIsLoadingMore(false);
		}
	};

	useEffect(() => {
		fetchData(1);
	}, []);

	const loadMore = () => {
		if (!isLoadingMore && !isLoading && hasMore) {
			const nextPage = page + 1;
			setPage(nextPage);
			fetchData(nextPage, true);
		}
	};

	const renderItem = ({ item }: { item: Job }) => (
		<Card
			id={item?.id}
			company_name={item?.company_name || 'Company Not specified'}
			title={item?.title || 'Job title not specified'}
			location={item?.primary_details?.Place || 'Remote'}
			salary={item?.primary_details?.Salary || 'Not specified'}
			phone={item?.whatsapp_no || 'Not specified'}
			image={item?.creatives?.[0]?.thumb_url}
		/>
	);

	const renderFooter = () => {
		if (!isLoadingMore) return null;
		return (
			<View className='py-4'>
				<ActivityIndicator size='large' color='#ffffff' />
			</View>
		);
	};

	if (isLoading) {
		return (
			<View className='flex-1 bg-black justify-center items-center'>
				<ActivityIndicator size='large' color='#ffffff' />
			</View>
		);
	}

	if (isError) {
		return (
			<View className='flex-1 bg-black justify-center items-center'>
				<Text className='text-2xl text-white'>
					Error fetching data...
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
				data={data}
				renderItem={renderItem}
				keyExtractor={(_, index) => index.toString()}
				onEndReached={loadMore}
				onEndReachedThreshold={0.8}
				ListFooterComponent={renderFooter}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className='h-4 w-full' />}
				contentContainerClassName='p-4'
			/>
		</View>
	);
}
