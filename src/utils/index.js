import generatePuzzle from "./generatePuzzle/generatePuzzle";
import styles from './styles/styles';
import dateInfo from './dateInfo/dateInfo';
import getSettings from './getSettings/getSettings';
import setSettings from './setSettings/setSettings';
import getGameStatus from "./getGameStatus/getGameStatus";
import setGameStatus from "./setGameStatus/setGameStatus";
import getGridSize from "./getGridSize/getGridSize";
import getSquareSize from "./getSquareSize/getSquareSize";
import getGameHistory from "./getGameHistory/getGameHistory";
import setGameHistory from "./setGameHistory/setGameHistory";
import getStats from './getStats/getStats';
import getSeenHowToPlay from './getSeenHowToPlay/getSeenHowToPlay';
import setSeenHowToPlay from "./setSeenHowToPlay/setSeenHowToPlay";
import {useViewport, ViewportProvider} from './viewportProvider/viewportProvider';

export {
    generatePuzzle,
    styles,
    dateInfo,
    getSettings,
    setSettings,
    getGameStatus,
    setGameStatus,
    getGridSize,
    getSquareSize,
    useViewport,
    ViewportProvider,
    getGameHistory,
    setGameHistory,
    getStats,
    getSeenHowToPlay,
    setSeenHowToPlay,
};