// import React, { useState, useEffect } from "react";

const getSettings = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)');
  const currentSettings = JSON.parse(localStorage.getItem('settings'));
  let settings = {
    darkMode: isDark.matches,
    lockTopCorner: true,
    showSums: false,
  }
  let isDarkMode = isDark.matches;
  if (currentSettings) {
    // isDarkMode = currentSettings.darkMode;
    settings = currentSettings;
  }

  return settings;
}

export default getSettings;
