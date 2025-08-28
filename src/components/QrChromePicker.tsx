import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useColorPicker } from '../store/useQrColorPicker';
import { IoColorWandOutline, IoColorWand, IoColorWandSharp } from 'react-icons/io5';

// eslint-disable-next-line
import { ChromePicker, ChromePickerProps } from 'react-color';

export interface QrChromePickerProps extends ChromePickerProps {
  id?: number;
  icon?: JSX.Element;
  variantName?: 'BG Color' | 'FG Color' | 'Eye Color';
  variant?: 'bgColor' | 'fgColor' | 'eyeColor';
}

type currentPickerType = QrChromePickerProps['variant'] | null;

export default function QrChromePicker() {
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<currentPickerType>(null);
  const colorPicker = useColorPicker();

  const colorOptions: QrChromePickerProps[] = [
    {
      id: 1,
      variant: 'bgColor',
      variantName: 'BG Color',
      icon: <IoColorWandOutline />,
      color: colorPicker.bgColor,
      onChange: (color: { hex: string }) => colorPicker.changeBgColor(color.hex),
    },
    {
      id: 2,
      variant: 'fgColor',
      variantName: 'FG Color',
      icon: <IoColorWand />,
      color: colorPicker.fgColor,
      onChange: (color: { hex: string }) => colorPicker.changeFgColor(color.hex),
    },
    {
      id: 3,
      variant: 'eyeColor',
      variantName: 'Eye Color',
      icon: <IoColorWandSharp />,
      color: colorPicker.eyeColor,
      onChange: (color: { hex: string }) => colorPicker.changeEyeColor(color.hex),
    },
  ];

  const togglePicker = (content: currentPickerType) => {
    if (!currentPicker && !showPicker) {
      setCurrentPicker(content);
      setShowPicker(true);
    } else if (currentPicker === content && showPicker) {
      setCurrentPicker(null);
      setShowPicker(false);
    } else {
      setCurrentPicker(content);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" gap={2} mb={2}>
      {colorOptions.map((item) => {
        const isActive = currentPicker === item.variant && showPicker;
        const handlePicker = () => togglePicker(item.variant);
        return (
          <div key={item.id} className="relative">
            <Button
              maxWidth={84}
              leftIcon={item.icon}
              variant={isActive ? 'outline-solid' : 'solid'}
              border={isActive ? '1px' : 'hidden'}
              borderColor={isActive ? 'blue.500' : undefined}
              colorScheme="blue"
              color="black"
              size="xs"
              onClick={handlePicker}
            >
              {item.variantName}
            </Button>

            {showPicker && currentPicker === item.variant && (
              <ChromePicker className="absolute z-999 top-10 right-0" color={item.color} onChange={item.onChange} />
            )}
          </div>
        );
      })}
    </Flex>
  );
}
