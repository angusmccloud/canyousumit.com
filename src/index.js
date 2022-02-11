import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from "@mui/material";
import App from "./App";
import './index.css';
import './assets/fonts/Lucida-Console-Regular.ttf';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  rootElement
);