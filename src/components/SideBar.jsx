import React from "react";
import ReactHtmlParser from "react-html-parser";
import { CryptoState } from "../contexts/blockContext";
import { numberWithCommas } from "../config/numberwithCommas";
import { LinearProgress } from "@mui/material";

const SideBar = ({ token }) => {
  const { currency, currencySymbol } = CryptoState();

  return (
    <div
      className="w-full md:w-1/3 flex flex-col space-y-6 py-10 justify-center  border-r-2 border-r-slate-100 dark:border-r-zinc-600"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      }}
    >
      <img
        src={token?.image.large}
        alt={token?.name}
        className="w-1/3 transition-all duration-100 md:w-[200px] md:h-[200px] mx-auto"
      />

      <h1 className=" text-zinc-800 dark:text-white text-3xl md:text-5xl font-bold font-lato text-center">
        {token?.name}
      </h1>
      <p className="text-zinc-800 dark:text-white text-sm text-center font-lato px-6">
        {ReactHtmlParser(token?.description.en.split(". ")[0])}
      </p>
      <p className="text-zinc-800 dark:text-white text-xl md:text-2xl font-extrabold text-center  font-lato px-6">
        {" "}
        Rank:{" "}
        <span className="text-zinc-800 dark:text-white text-md font-semibold">
          {token?.market_cap_rank}
        </span>
      </p>
      <p className="text-zinc-800 dark:text-white text-xl md:text-2xl font-extrabold text-center  font-lato px-6">
        {" "}
        Current Price:{" "}
        <span className="text-zinc-800 dark:text-white text-md font-semibold">
          {currencySymbol}{" "}
          {numberWithCommas(
            token?.market_data.current_price[currency?.toLowerCase()]
          )}
        </span>
      </p>
      <p className="text-zinc-800 dark:text-white text-xl md:text-2xl font-extrabold text-center  font-lato px-6">
        {" "}
        Market Cap:{" "}
        <span className="text-zinc-800 dark:text-white text-md font-semibold">
          {currencySymbol}{" "}
          {numberWithCommas(
            token?.market_data.market_cap[currency?.toLowerCase()]
              .toString()
              .slice(0, -6)
          )}
        </span>
      </p>
    </div>
  );
};

export default SideBar;
