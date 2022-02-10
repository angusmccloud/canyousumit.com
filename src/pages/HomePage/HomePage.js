import React from "react";
import { PageHeader, GameBoard } from '../../containers';
import ReactGA from "react-ga4";
import { colorPalette } from "../../consts";

const HomePage = () => {
  const colors = colorPalette();
  ReactGA.initialize([
    {
      trackingId: 'G-X0L52798CN',
    },
  ]);
  ReactGA.send({ hitType: "pageview", page: "/" });

  return (
    <>
      <div style={{ width: '100%', height: '100%', backgroundColor: colors.white}}>
        <PageHeader pageName={'Sum it!'} />
        <GameBoard />
      </div>
    </>
  );
}

export default HomePage;
