// import React, { useState, useEffect } from "react";

const setSettings = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export default setSettings;
