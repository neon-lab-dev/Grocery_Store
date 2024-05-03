import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {close} from '../../assets/images/icons/close';
import {Modal, Pressable, Text, View, IModalProps} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {styles} from './style';
import MultiSlider, {LabelProps} from '@ptomasroos/react-native-multi-slider';
import Radio from './RadioButton';
import Checkbox from './Checkbox';

interface FilterOverlayProps extends IModalProps {
  showModal: boolean;
  onClose: () => void;
}

const FilterOverlay: React.FC<FilterOverlayProps> = ({
  showModal,
  onClose,
  ...props
}) => {
  const filterOptions = ['Sort', 'Price', 'Brands'];
  const [selectedOption, setSelectedOption] = useState('Sort');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Garnier']);
  const [selectedMinValue, setSelectedMinValue] = useState<number>(24);
  const [selectedMaxValue, setSelectedMaxValue] = useState<number>(149);
  const radioButtonsData = [
    {id: '0', label: 'Relevance (default)', value: 'default'},
    {id: '1', label: 'Price (low to high)', value: 'lowtohigh'},
    {id: '2', label: 'Price (high to low)', value: 'hightolow'},
    {id: '3', label: 'Popularity', value: 'popularity'},
    {id: '4', label: 'Discount (high to low)', value: 'discount'},
  ];
  const brands = ['Garnier', 'Ponds', 'Mama Earth', 'MCaffeine', 'Dove'];

  const customLabel = (sliderPosition: LabelProps) => {
    return (
      <>
        <View
          height={20}
          width={'auto'}
          position={'absolute'}
          left={sliderPosition.oneMarkerLeftPosition - 10}
          bottom={-40}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(12)}
            color={'#22C55E'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            ₹{selectedMinValue}
          </Text>
        </View>
        <View
          height={20}
          width={'auto'}
          position={'absolute'}
          left={sliderPosition.twoMarkerLeftPosition - 10}
          bottom={-40}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(12)}
            color={'#22C55E'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            ₹{selectedMaxValue}
          </Text>
        </View>
      </>
    );
  };
  const selectedOptionContent = () => {
    switch (selectedOption) {
      case 'Sort':
        return (
          <View>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(18)}
              color={'accent.700'}
              pl={horizontalScale(15)}
              py={verticalScale(15)}
              lineHeight={21.78}
              letterSpacing={-0.04}>
              Sort By
            </Text>
            <Radio
              options={radioButtonsData}
              onSelect={option => console.log(option)}
            />
          </View>
        );
      case 'Price':
        return (
          <View px={horizontalScale(15)} py={verticalScale(15)}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(18)}
              color={'accent.700'}
              mb={verticalScale(10)}
              lineHeight={21.78}
              letterSpacing={-0.04}>
              Price
            </Text>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'accent.500'}
              mb={verticalScale(5)}
              lineHeight={16.94}
              letterSpacing={-0.04}>
              Select Range
            </Text>
            <MultiSlider
              values={[selectedMinValue, selectedMaxValue]}
              sliderLength={horizontalScale(200)}
              min={0}
              max={299}
              step={1}
              minMarkerOverlapDistance={40}
              enableLabel
              customLabel={sliderPosition => customLabel(sliderPosition)}
              onValuesChange={values => {
                setSelectedMinValue(values[0]);
                setSelectedMaxValue(values[1]);
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.sliderTrack}
              selectedStyle={styles.selectedTrack}
              markerContainerStyle={styles.markerContainer}
              markerStyle={styles.marker}
            />
            <View flexDir={'row'} justifyContent={'space-between'}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(12)}
                color={'accent.400'}
                lineHeight={14.52}
                letterSpacing={-0.04}>
                ₹0
              </Text>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(12)}
                color={'accent.400'}
                lineHeight={14.52}
                letterSpacing={-0.04}>
                ₹299
              </Text>
            </View>
          </View>
        );
      case 'Brands':
        return (
          <View px={horizontalScale(15)} py={verticalScale(15)}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(18)}
              color={'accent.700'}
              mb={5}
              lineHeight={21.78}
              letterSpacing={-0.04}>
              Sort By
            </Text>
            <Checkbox
              options={brands}
              selectedOptions={selectedBrands}
              onChange={selectedOptions => setSelectedBrands(selectedOptions)}
            />
          </View>
        );
    }
  };
  return (
    <Modal {...props} isOpen={showModal} size={'full'} onClose={onClose}>
      <Modal.Content
        mb={0}
        mt={'auto'}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        h={'66%'}
        bgColor={'#ffffff'}>
        <View
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={horizontalScale(15)}
          py={verticalScale(15)}>
          <Text
            fontFamily={'Inter_Medium'}
            color={'accent.800'}
            fontSize={scaleFontSize(18)}
            lineHeight={21.78}
            letterSpacing={-0.04}>
            Filter Items
          </Text>
          <Pressable onPress={onClose}>
            <SvgXml xml={close} height={20} width={20} />
          </Pressable>
        </View>
        <View borderWidth={0.5} borderColor={'accent.200'} />
        <View flexDir={'row'}>
          <View>
            {filterOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOption(option)}>
                <View
                  pl={horizontalScale(15)}
                  mt={verticalScale(20)}
                  flexDir={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text
                    fontFamily={'Inter_Medium'}
                    color={
                      selectedOption === option ? 'primary.500' : 'accent.500'
                    }
                    fontSize={scaleFontSize(18)}
                    lineHeight={21.78}
                    letterSpacing={-0.04}>
                    {option}
                  </Text>
                  <View
                    backgroundColor="primary.500"
                    borderTopLeftRadius={100}
                    borderBottomLeftRadius={100}
                    height={'170%'}
                    width={horizontalScale(5)}
                    ml={horizontalScale(30)}
                    opacity={selectedOption === option ? 1 : 0}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View
            h={verticalScale(500)}
            borderWidth={0.5}
            borderColor={'accent.200'}
          />
          <View>{selectedOptionContent()}</View>
        </View>
      </Modal.Content>
    </Modal>
  );
};

export default FilterOverlay;
