import React, { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Icon,
  IconButton,
  Button,
  ButtonGroup,
  Tooltip,
} from '@chakra-ui/react';
import { FiUpload, FiImage, FiX } from 'react-icons/fi';

interface FileUploadProps {
  name: string;
  acceptedFileTypes?: string;
  children: React.ReactNode;
  isRequired?: boolean;
}

interface FileUploadWithImageProps extends FileUploadProps {
  currentImage: string | null;
  imageName: string | null;
  onImageChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const isImagePresent = currentImage ? false : true;

  return (
    <FormControl isRequired={isRequired} display="flex" flexDirection="column">
      <FormLabel htmlFor={name}>{children}</FormLabel>
      <InputGroup>
        <ButtonGroup maxWidth={234} spacing={1} isAttached={imageName ? true : false} variant="solid" flex="1">
          <Button
            onClick={handleClick}
            colorScheme="blue"
            color="black"
            fontSize={imageName ? 'xs' : 'md'}
            leftIcon={<Icon as={currentImage ? FiImage : FiUpload} />}
            flex="1"
          >
            {imageName ? imageName : 'Upload Image'}
          </Button>

          <Tooltip hasArrow placement="top" label="Remove Image" bg="red.500">
            <IconButton
              isDisabled={isImagePresent}
              colorScheme="red"
              variant="solid"
              color="black"
              icon={<FiX />}
              aria-label="Remove Image"
              onClick={removeImage}
            />
          </Tooltip>
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
    </FormControl>
  );
}
