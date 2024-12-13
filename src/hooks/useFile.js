import { useState } from 'react';
import { Services } from '../services';

export const useFile = (type = 'image') => {
	const abortController = new AbortController();

	const [fileUrl, setFileUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileChange = async file => {
		setIsLoading(true);
		
		const {store, storeDoc, product_store}  = Services.FileService;
		let fileStore = store;

		if (type === 'product') fileStore = product_store;
		if (type === 'file') fileStore = storeDoc;

		try {
			const formData = new FormData();

			formData.append(type === 'product' ? 'image' : type, file);

			const {image_url, file_url} = await fileStore(
				formData, abortController.signal);

			setFileUrl(image_url ?? file_url);
		} catch(error) {
			if (!('message' in error)) return;
			setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return {
		fileUrl,
		isLoading,
		errorMessage,
		handleFileChange,
		setFileUrl,
	}
}