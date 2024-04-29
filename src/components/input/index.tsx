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
  validation: boolean;
  validationError: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  setValue,
  placeholder,
  leftElement,
  validation,
  validationError,
  required,
}) => {
  const [touchedOnce, setTouchedOnce] = React.useState<boolean>();
  const isEmptyAndNotRequired = !required && !value;
  return (
    <>
      <Input
        value={value}
        onChangeText={txt => setValue(txt)}
        variant={'filled'}
        rounded={15}
        mb={verticalScale(10)}
        py={verticalScale(12)}
        pl={horizontalScale(15)}
        bg={'accent.100'}
        _focus={{borderColor: 'accent.100', bgColor: 'accent.100'}}
        fontFamily={'Inter_Medium'}
        fontSize={scaleFontSize(16)}
        placeholderTextColor={'accent.400'}
        placeholder={placeholder}
        InputLeftElement={leftElement}
        onSubmitEditing={() => setTouchedOnce(true)}
      />
      {touchedOnce && !validation && !isEmptyAndNotRequired && (
        <Text
          fontFamily={'Inter_Regular'}
          fontSize={scaleFontSize(14)}
          color={'#EF4444'}
          mt={-verticalScale(10)}>
          {validationError}
        </Text>
      )}
    </>
  );
};

export default TextInput;
