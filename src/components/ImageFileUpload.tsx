import React, { useRef } from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	FormErrorMessage,
	Icon,
	IconButton,
	Button,
	ButtonGroup,
} from '@chakra-ui/react';
import { FiUpload, FiImage, FiX } from 'react-icons/fi';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

interface FileUploadProps {
	name: string;
	acceptedFileTypes?: string;
	children: React.ReactNode;
	isRequired?: boolean;
}

interface FileUploadWithImageProps extends FileUploadProps {
	currentImage: string | null;
	imageName: string | null;
	onImageChange: (e: inputEvent) => void;
	removeImage: () => void;
}

export default function ImageFileUpload({
	name,
	acceptedFileTypes,
	children,
	isRequired = false,
	imageName,
	onImageChange,
	removeImage,
	currentImage,
}: FileUploadWithImageProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = () => inputRef.current?.click();

	return (
		<FormControl
			isRequired={isRequired}
			className="flex flex-col max-w-[180px]"
		>
			<FormLabel htmlFor={name}>{children}</FormLabel>
			<InputGroup>
				<ButtonGroup
					isAttached={imageName ? true : false}
					variant="solid"
				>
					<Button
						onClick={handleClick}
						colorScheme="blue"
						leftIcon={<Icon as={currentImage ? FiImage : FiUpload} />}
					>
						{imageName ? imageName : 'Upload Image'}
					</Button>
					{imageName && (
						<IconButton
							color="red.500"
							variant="outlined"
							icon={<FiX />}
							aria-label="Remove Image"
							onClick={removeImage}
						/>
					)}
				</ButtonGroup>
				<Input
					type="file"
					className="hidden"
					name={name}
					ref={inputRef}
					onChange={onImageChange}
					accept={acceptedFileTypes}
				/>
			</InputGroup>
			<FormErrorMessage></FormErrorMessage>
		</FormControl>
	);
}
