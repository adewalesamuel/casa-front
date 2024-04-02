import { useState } from 'react';
import { Services } from '../services';

export const useFile = () => {
	const abortController = new AbortController();

	const [file_url, setFile_url] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileChange = async file => {
		console.log('hello')
		try {
			const formData = new FormData();

			formData.append('img_url', file);

			const {img_url} = await Services.FileService.store(
				formData, abortController.signal);

			setFile_url(img_url);
		} catch(error) {
			if (!('message' in error)) return;
			setErrorMessage(error.message);
		}
	}

	return {
		file_url,
		errorMessage
	}
}