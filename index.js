/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ImageCarousel from './src/components/Carousel/ImageCarousel';

AppRegistry.registerComponent(appName, () => ImageCarousel);
