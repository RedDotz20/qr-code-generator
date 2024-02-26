import React, { useState } from 'react';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

export const useImageUpload = () => {
	const [currentImage, setImage] = useState<string | null>(null);

	const handleImageChange = (e: inputEvent) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setImage(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => setImage(null);

	return { currentImage, removeImage, handleImageChange };
};
