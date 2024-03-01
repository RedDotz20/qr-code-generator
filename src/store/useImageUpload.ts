import { create } from 'zustand';

type ImageUploadStore = {
	currentImage: string | null;
	imageName: string | null;
	setImage: (image: string | null) => void;
	removeImage: () => void;
	setImageName: (name: string | null) => void;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useImageUploadStore = create<ImageUploadStore>((set) => ({
	currentImage: null,
	imageName: null,
	setImage: (image) => set({ currentImage: image }),
	setImageName: (name) => set({ imageName: name }),
	removeImage: () => set({ currentImage: null, imageName: null }),
	handleImageChange: (e) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				set({ currentImage: reader.result as string });
				set({ imageName: file.name });
			};
			reader.readAsDataURL(file);
		}
	},
}));
