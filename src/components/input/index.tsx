import * as React from 'react';
import {IInputProps, Input, Text} from 'native-base';
import {
  verticalScale,
  scaleFontSize,
  horizontalScale,
} from '../../assets/scaling';

interface TextInputProps extends IInputProps {
  placeholder: string;
  value: any;
  setValue: (val: any) => void;
  leftElement?: JSX.Element;
  isErrorShown: boolean;
  maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  setValue,
  placeholder,
  leftElement,
  isErrorShown,
  maxLength,
}) => {
  return (
    <>
      <Input
        value={value}
        onChangeText={txt => setValue(txt)}
        variant={'filled'}
        rounded={15}
        mb={verticalScale(12)}
        py={verticalScale(10)}
        pl={horizontalScale(15)}
        bg={'accent.100'}
        borderColor={isErrorShown ? 'error.300' : 'accent.100'}
        _focus={{
          borderColor: isErrorShown ? 'error.300' : 'accent.100',
          bgColor: 'accent.100',
        }}
        fontFamily={'Inter_Medium'}
        lineHeight={19.36}
        letterSpacing={-0.04}
        fontSize={scaleFontSize(16)}
        color={'accent.800'}
        placeholderTextColor={'accent.400'}
        placeholder={placeholder}
        InputLeftElement={leftElement}
        maxLength={maxLength}
      />
    </>
  );
};

export default TextInput;
