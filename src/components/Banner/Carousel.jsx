import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../contexts/blockContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../config/numberwithCommas";

const Carousel = () => {
  const { currency, currencySymbol } = CryptoState();
  const [trendingList, setTrendingList] = useState([]);

  const trendingCoin = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrendingList(data);
    } catch (error) {
      console.error(error);
    }
  };

  //   getting carousel items

  const items = trendingList?.map((token) => {
    let percentageChange = token?.price_change_percentage_24h >= 0;

    return (
      <Link to={`coins/${token.id}`} className="flex flex-col items-center ">
        <img src={token.image} alt={token.name} className="h-16 md:h-24" />
        <div className="flex space-x-2 mt-4">
          {" "}
          <span className="text-sm font-dmsans capitalize text-zinc-800 dark:text-white">
            {token?.symbol}
          </span>
          <span
            style={{
              color:
                percentageChange > 0
                  ? "rgb(14, 203, 129)"
                  : "rgb(242, 75, 103)",
            }}
          >
            {percentageChange && "+"}{" "}
            {token?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
        <span className=" text-sm md:text-lg font-semibold text-zinc-800 dark:text-white">
          {currencySymbol} {numberWithCommas(token?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  //   carousel responsiveness
  const screenResponsive = {
    0: {
      items: 2,
    },
    500: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  // calling trending coin list
  useEffect(() => {
    trendingCoin();
  }, [currency]);
  return (
    <div className="flex items-center text-center pl-10 sm:px-6 md:pl-16">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1500}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        responsive={screenResponsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
