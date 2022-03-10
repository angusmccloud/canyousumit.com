import React, { useState, useEffect } from "react";
import { PageHeader, PageFooter, GameBoard } from '../../containers';
import ReactGA from "react-ga4";
import { colorPalette, googleAnalyticsId } from "../../consts";
import { useViewport } from '../../utils';
import { Container } from '../../components';

const HomePage = () => {
  const [triggerTime, setTriggerTime] = useState(0);
  const colors = colorPalette();

  useEffect(() => {
    ReactGA.initialize([{trackingId: googleAnalyticsId}]);
    ReactGA.send({ hitType: "pageview", page: "/" });
  }, []);

  const handleThemeChange = () => {
    setTriggerTime(new Date().getTime());
  }

  document.body.style.backgroundColor = colors.background;
  const { height } = useViewport();

  return (
    <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: height}}>
      <Container>
        <PageHeader />
        <GameBoard triggerTime={triggerTime} />
      </Container>
      <PageFooter handleThemeChange={handleThemeChange} />
    </Container>
  );
}

export default HomePage;
