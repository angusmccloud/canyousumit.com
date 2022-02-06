import React from "react";
import { PageHeader, GameBoard } from '../../containers';

const HomePage = () => {
  return (
    <>
      <PageHeader pageName={'Sum it!'} />
      <GameBoard />
    </>
  );
}

export default HomePage;
