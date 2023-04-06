import React from "react";
import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import Banner from "../components/Banner/Banner";

const Homepage = () => {
  return (
    <div className="dark:bg-black bg-white">
      <Header />
      <Banner />
      <CoinTable />
    </div>
  );
};

export default Homepage;
