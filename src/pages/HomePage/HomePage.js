import React, { useState, useEffect } from "react";
import { PageHeader, PageFooter, GameBoard } from '../../containers';
import ReactGA from "react-ga4";
import { colorPalette, googleAnalyticsId } from "../../consts";

const HomePage = () => {
  const [triggerTime, setTriggerTime] = useState(0);
  const colors = colorPalette();

  useEffect(() => {
    ReactGA.initialize([{trackingId: googleAnalyticsId}]);
    ReactGA.send({ hitType: "pageview", page: "/" });
  }, []);

  const handleThemeChange = () => {
    setTriggerTime(new Date);
  }

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: colors.background}}>
      <PageHeader />
      <GameBoard triggerTime={triggerTime} />
      <PageFooter handleThemeChange={handleThemeChange} />
    </div>
  );
}

export default HomePage;
