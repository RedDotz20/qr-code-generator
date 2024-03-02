import { ChangeEvent } from 'react';
import { Flex, Select, Text } from '@chakra-ui/react';
import { useQrOptionsStore, QrOptionsType, StringQrOptions } from '../store/useQrOptionStore';

export interface QrSelectProps {
  option: StringQrOptions;
  name: string;
}

interface qrSelectionTypes {
  qrStyle: QrOptionsType['qrStyle'][];
  ecLevel: QrOptionsType['ecLevel'][];
  logoPaddingStyle: QrOptionsType['logoPaddingStyle'][];
}

export default function QrSelect({ option, name }: QrSelectProps) {
  const { qrOptions, setQrOption } = useQrOptionsStore();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as QrOptionsType[keyof QrOptionsType];
    setQrOption(option, selectedValue);
  };

  const qrSelection: qrSelectionTypes = {
    qrStyle: ['squares', 'dots'],
    ecLevel: ['M', 'L', 'Q', 'H'],
    logoPaddingStyle: ['circle', 'square'],
  };

  const selectedOption = qrSelection[option];

  return (
    <Flex width="full" gap={1} direction="column" align="flex-start" justifyContent="space-between">
      <Text fontSize="xs">{name}</Text>
      <Select size="xs" variant="filled" value={qrOptions[option]} onChange={handleSelectChange}>
        {selectedOption.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
}
