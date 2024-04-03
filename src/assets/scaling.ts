import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Getting the Device's screen dimensions
export const {width, height} = Dimensions.get('window');

// Checking the device is small or not
const isSmall = width <= 375 && !DeviceInfo.hasNotch(); // For 5 inch screen

// Guideline Base width based on whether the device is small or not
const guidelineBaseWidth = () => {
  if (isSmall) {
    // small device return the size as 330, that fits smaller devices
    return 330;
  }
  return 350;
};

// Guideline Base height based on the device's width
const guidelineBaseHeight = () => {
  if (isSmall) {
    // if device is small, return 550 (enough vertical space without taking up too much screen real estate)
    return 550;
  } else if (width > 410) {
    // if device width is greater than 410 (close to iPhone 6/7/8 Plus width), return 620 (enough vertical space without making the UI feel cramped)
    return 620;
  }
  return 680; // if device width is less than or equal to 410, return 680 (appropriate for devices with even wider screens, such as some Android phones)
};

// Define the guideline base font size based on the device's width
const guidelineBaseFonts = () => {
  if (width > 410) {
    // if device width is greater than 410 (close to iPhone 6/7/8 Plus width), return 430
    return 430;
  }
  return 400; // if device width is less than or equal to 410, return 400
};

// Scaling Functions
// Function to scale a size horizontally based on the device's width
const horizontalScale = (size: number) => (width / guidelineBaseWidth()) * size;

// Function to scale a size vertically based on the device's height
const verticalScale = (size: number) => (height / guidelineBaseHeight()) * size;

// Function to scale a font size based on the device's width
const scaleFontSize = (size: number) =>
  Math.round((size * width) / guidelineBaseFonts());

export {horizontalScale, verticalScale, scaleFontSize};
