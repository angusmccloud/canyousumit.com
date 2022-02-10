import {getSettings} from '../../utils';

const colorsRegular = {
	primaryBlue: '#4279ad',
	darkBlue: '#2e6379',
	mediumBlue: '#b0e7ff',
	lightBlue: '#d8f3ff',
	white: '#ffffff',
	black: '#000000',
};

const colorsDark = {
	primaryBlue: '#4279ad',
	lightBlue: '#2e6379',
	mediumBlue: '#b0e7ff',
	darkBlue: '#d8f3ff',
	black: '#ffffff',
	white: '#000000',
};

const colorPalette = () => {
	// const settings = getSettings();
	// if (settings.darkMode) {
	// 	return colorsDark;
	// } else {
	// 	return colorsRegular;
	// }
	// Need to figure out the Dark Mode palette and switch it on at some point...
	return colorsRegular;
}

export default colorPalette;