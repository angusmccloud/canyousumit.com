import {getSettings} from '../../utils';

const colorsRegular = {
	primaryBlue: '#4279ad',
	darkBlue: '#214a5c',
	mediumBlue: '#b0e7ff',
	lightBlue: '#d8f3ff',
	white: '#ffffff',
	black: '#000000',
	green: '#6aa74e',
};

const colorsDark = {
	primaryBlue: '#4279ad',
	lightBlue: '#75a8df',
	mediumBlue: '#b0e7ff',
	darkBlue: '#004d7d',
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