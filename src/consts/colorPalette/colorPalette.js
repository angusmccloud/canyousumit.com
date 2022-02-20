import {getSettings} from '../../utils';

const colors = {
	primaryBlue: '#4279ad',
	darkBlue: '#214a5c',
	mediumBlue: '#b0e7ff',
	lightBlue: '#d8f3ff',
	white: '#ffffff',
	black: '#000000',
	green: '#6aa74e',
	twitterBlue: '#1DA1F2',
};

const colorsRegular = {
	textDefault: colors.darkBlue,
	textHighlight: colors.green,
	cellText: colors.white,
	lockedCellText: colors.white,
	cell: colors.primaryBlue,
	lockedCell: colors.darkBlue,
	background: colors.white,
	divider: colors.primaryBlue,
	hoverBackground: colors.lightBlue,
	...colors,
};

const colorsDark = {
	textDefault: colors.lightBlue,
	textHighlight: colors.green,
	cellText: colors.white,
	lockedCellText: colors.darkBlue,
	cell: colors.primaryBlue,
	lockedCell: colors.mediumBlue,
	background: colors.black,
	divider: colors.lightBlue,
	hoverBackground: colors.darkBlue,
	...colors,
};

const colorPalette = () => {
	const settings = getSettings();
	if (settings.darkMode) {
		return colorsDark;
	} else {
		return colorsRegular;
	}
	// Need to figure out the Dark Mode palette and switch it on at some point...
	// return colorsRegular;
}

export default colorPalette;