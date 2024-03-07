import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Alert, TextInput, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {debounce} from 'lodash';
import {getSearchResults} from '../../api';
import Item from '../../components/Item';

export default () => {
	const [items, setItems] = useState([] as any[]);
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const fetchItems = async (queryText: string, pageNum: number) => {
		try {
			setLoading(true);
			const res = await getSearchResults(queryText, pageNum);
			setItems([...items, ...res?.data?.items?.materials]);
		} catch (error) {
			error instanceof Error &&
				Alert.alert('Something went wrong', error?.message);
		} finally {
			setLoading(false);
		}
	};

	const searchQuery = useCallback(
		debounce((text: string) => {
			setQuery(text);
			setPage(1);
		}, 300),
		[]
	);

	useEffect(() => {
		fetchItems(query, page);
	}, [page]);

	useEffect(() => {
		if (query === '') {
			return;
		}
		setItems([]);
		fetchItems(query, page);
	}, [query]);

	return (
		<SafeAreaView style={{flex: 1}} edges={['top']}>
			<View style={{height: 60, borderWidth: 1, borderColor: 'darkgray'}}>
				<TextInput
					style={{flex: 1, backgroundColor: 'white', padding: 10}}
					onChangeText={searchQuery}
					placeholder='Search'
				/>
			</View>
			{loading && items.length === 0 ? (
				<ActivityIndicator size='large' color='gray' />
			) : null}
			{items.length === 0 ? (
				<Text>No items found</Text>
			) : (
				<FlashList
					data={items}
					renderItem={({item}) => <Item {...item} />}
					keyExtractor={(item, index) => item?.id?.toString() + index}
					estimatedItemSize={380}
					onEndReached={() => {
						if (loading) {
							return;
						}
						setPage((p) => p + 1);
					}}
					ItemSeparatorComponent={() => (
						<View style={{height: 2, backgroundColor: 'darkgray'}} />
					)}
					ListFooterComponent={() =>
						loading &&
						items.length > 0 && <ActivityIndicator size='large' color='gray' />
					}
				/>
			)}
		</SafeAreaView>
	);
};
