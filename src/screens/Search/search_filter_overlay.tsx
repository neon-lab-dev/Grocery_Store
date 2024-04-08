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
import {RadioButton} from 'react-native-paper';
import {styles} from './style';
import MultiSlider, {LabelProps} from '@ptomasroos/react-native-multi-slider';
import CheckBox from '@react-native-community/checkbox';

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
  const [sortOption, setSortOption] = useState('default');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMinValue, setSelectedMinValue] = useState<number>(0);
  const [selectedMaxValue, setSelectedMaxValue] = useState<number>(100);
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
            fontSize={scaleFontSize(14)}
            fontWeight={'fw500'}
            color={'secondary.500'}>
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
            fontSize={scaleFontSize(14)}
            fontWeight={'fw500'}
            color={'secondary.500'}>
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
              fontSize={scaleFontSize(18)}
              color={'accent.700'}
              pl={5}
              pt={5}>
              Sort By
            </Text>
            {radioButtonsData.map(item => (
              <View key={item.id} style={styles.radioButtonContainer}>
                <RadioButton
                  value={item.value}
                  status={sortOption === item.value ? 'checked' : 'unchecked'}
                  onPress={() => setSortOption(item.value)}
                  color="#F97316"
                />
                <Text style={styles.radioLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        );
      case 'Price':
        return (
          <View p={5}>
            <Text fontSize={scaleFontSize(18)} color={'accent.700'} mb={5}>
              Price
            </Text>
            <Text fontSize={scaleFontSize(14)} color={'accent.500'} mb={2}>
              Select Range
            </Text>
            <MultiSlider
              values={[0, 100]}
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
              pressedMarkerStyle={styles.pressedMarker}
            />
            <View flexDir={'row'} justifyContent={'space-between'}>
              <Text fontSize={scaleFontSize(14)} color={'accent.400'}>
                ₹0
              </Text>
              <Text fontSize={scaleFontSize(14)} color={'accent.400'}>
                ₹299
              </Text>
            </View>
          </View>
        );
      case 'Brands':
        return (
          <View p={5}>
            <Text fontSize={scaleFontSize(18)} color={'accent.700'} mb={5}>
              Sort By
            </Text>
            {brands.map((brand, index) => (
              <View key={index} flexDir={'row'} alignItems={'center'}>
                <CheckBox
                  value={selectedBrands.includes(brand)}
                  onValueChange={() => {
                    const newSelection = selectedBrands.includes(brand)
                      ? selectedBrands.filter(item => item !== brand)
                      : [...selectedBrands, brand];

                    setSelectedBrands(newSelection);
                  }}
                  tintColors={{true: '#F97316', false: '#9CA3AF'}}
                />
                <Text
                  fontSize={scaleFontSize(16)}
                  color={
                    selectedBrands.includes(brand) ? 'black' : 'accent.400'
                  }>
                  {brand}
                </Text>
              </View>
            ))}
          </View>
        );
    }
  };
  return (
    <Modal {...props} isOpen={showModal} size={'full'}>
      <Modal.Content
        mb={0}
        mt={'auto'}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        h={'50%'}>
        <View
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={5}>
          <Text fontSize={'fs18'}>Filter Items</Text>
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
                  pl={5}
                  py={5}
                  flexDir={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text
                    color={
                      selectedOption === option ? 'primary.500' : 'accent.500'
                    }
                    fontSize={scaleFontSize(18)}>
                    {option}
                  </Text>
                  <View
                    backgroundColor="primary.500"
                    borderTopLeftRadius={10}
                    borderBottomLeftRadius={10}
                    height={5}
                    width={1}
                    ml={5}
                    opacity={selectedOption === option ? 1 : 0}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View
            h={verticalScale(300)}
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
