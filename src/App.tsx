import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { IoSaveOutline } from 'react-icons/io5';
import { FaQrcode } from 'react-icons/fa6';
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useImageUploadStore } from './store/useImageUpload';
import { useQrOptionsStore } from './store/useQrOptionStore';
import { useColorPicker } from './store/useQrColorPicker';
import { useQrValue } from './hooks/useQrValue';

import ImageFileUpload from './components/ImageFileUpload';
import QrOptions from './components/QrOptions';

export default function App() {
  const qrCodeRef = useRef(null);
  const qrValue = useQrValue();
  const option = useQrOptionsStore();
  const image = useImageUploadStore();
  const color = useColorPicker();

  const saveAsImage = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'qrcode.png';
        link.click();

        alert('QR Code saved successfully!');
      });
    }
  };

  return (
    <>
      <Heading fontWeight="semibold" mb={4}>
        QR Code Generator
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center" className="bg-slate-300" p={8} gap={6}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} px={2} maxWidth={250}>
          <Heading as="h2" size="sm">
            Preview
          </Heading>
          <Box ref={qrCodeRef}>
            <QRCode
              value={qrValue.value as string}
              qrStyle={option.qrOptions.qrStyle}
              bgColor={color.bgColor}
              fgColor={color.fgColor}
              logoImage={image.currentImage ? image.currentImage : undefined}
              logoWidth={option.qrOptions.width}
              logoHeight={option.qrOptions.height}
              ecLevel={option.qrOptions.ecLevel}
              removeQrCodeBehindLogo={true}
              logoPadding={option.qrOptions.logoPadding}
              logoPaddingStyle={option.qrOptions.logoPaddingStyle}
              eyeRadius={option.qrOptions.eyeRadius}
              eyeColor={color.eyeColor}
            />
          </Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaQrcode color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Enter QR Content..." variant="filled" type="text" onChange={qrValue.handleQrChange} />
          </InputGroup>
          <ImageFileUpload
            name="imageFile"
            acceptedFileTypes="image/*"
            isRequired={true}
            imageName={image.imageName}
            onImageChange={image.handleImageChange}
            currentImage={image.currentImage}
            removeImage={image.removeImage}
          >
            Choose Image
          </ImageFileUpload>
          <Button
            width="full"
            leftIcon={<IoSaveOutline />}
            onClick={saveAsImage}
            colorScheme="blue"
            color="black"
            mt="2"
          >
            Save QR Code
          </Button>
        </Box>
        <Box gap="2">
          <Heading display="flex" mb={2} as="h2" size="sm">
            Customize
          </Heading>
          <QrOptions />
        </Box>
      </Flex>
    </>
  );
}
