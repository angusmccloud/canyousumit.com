import React from "react";
import { PageHeader, GameBoard } from '../../containers';
import ReactGA from "react-ga4";

const HomePage = () => {
  ReactGA.initialize([
    {
      trackingId: 'G-X0L52798CN',
    },
  ]);
  ReactGA.send({ hitType: "pageview", page: "/" });

  return (
    <>
      <PageHeader pageName={'Sum it!'} />
      <GameBoard />
    </>
  );
}

export default HomePage;
