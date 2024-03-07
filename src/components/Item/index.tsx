import React from 'react';
import {View, Text, Image} from 'react-native';

interface Props {
	firstPreviewImage: {
		watermarked: string;
	};
	title: string;
	author: {
		details: {
			publicName: string;
		};
	};
	price: number;
}

export default (item: Props) => {
	const {firstPreviewImage, title, author, price} = item;
	if (!firstPreviewImage || !title || !author || !price) {
		return null;
	}
	const imageURI = firstPreviewImage?.watermarked;
	const {width} = Image.resolveAssetSource({
		uri: imageURI,
	});

	return (
		<View
			style={{
				flex: 1,
				gap: 10,
				padding: 10,
			}}>
			<Image
				source={{
					uri: imageURI,
				}}
				defaultSource={require('../../../assets/icon.png')}
				style={{width, height: 300}}
			/>
			<Text style={{fontWeight: '700'}}>{title}</Text>
			<Text>{author?.details?.publicName || 'N/A'}</Text>
			<Text style={{fontWeight: '700'}}>{price}€</Text>
		</View>
	);
};
