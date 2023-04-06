import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../contexts/blockContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { currency, currencySymbol } = CryptoState();
  const [trendingList, setTrendingList] = useState([]);

  const trendingCoin = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      console.log(trendingList);
      setTrendingList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //   getting carousel items

  const items = trendingList?.map((token) => {
    let percentageChange = token.price_change_precentage_24h >= 0;
    return (
      <Link to={`coins/${token.id}`} className="flex flex-col items-start">
        <img src={token.image} alt={token.name} className="h-16 md:h-24" />
        <div className="flex space-x-2 mt-4">
          {" "}
          <span className="text-sm font-josefin">{token?.symbol}</span>
          <span
            style={{
              color: percentageChange
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
    360: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  //   useEffect(() => {
  //     trendingCoin();
  //   }, [currency]);
  return (
    <div className="flex items-center px-10 sm:px-6 md:px-16">
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
