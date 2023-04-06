import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { CryptoState } from "../contexts/blockContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinDetails from "../components/CoinDetails";
import SideBar from "../components/SideBar";
import { LinearProgress } from "@mui/material";

const CoinPage = () => {
  const { id } = useParams();
  const [token, setToken] = useState();

  const { currency, currencySymbol } = CryptoState();

  const fetchSingleCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));

      setToken(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(token);

  useEffect(() => {
    fetchSingleCoin();
  }, [currency]);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 dark:bg-black bg-white min-h-[90vh] ">
        {token ? (
          <SideBar token={token} />
        ) : (
          <LinearProgress className="dark:bg-yellow-500 bg-slate-600" />
        )}

        {/* charts  */}
        <CoinDetails className="w-full md:w-2/3" token={token} />
      </div>
    </div>
  );
};

export default CoinPage;
