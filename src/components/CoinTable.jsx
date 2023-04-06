import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../contexts/blockContext";
import {
  LinearProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CoinTable = () => {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const { currency } = CryptoState();

  const fetchingAllCoin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));

      if (data) {
        setCoinList(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(coinList);

  // calling fetcFunction
  // useEffect(() => {
  //   fetchingAllCoin();
  // }, [currency]);

  return (
    <div className="flex flex-col space-y-6 py-10">
      <h1 className="dark:text-white text-zinc-800 text-xl md:text-3xl font-semibold w-2/3 mx-auto text-center">
        Cryptocurrency Prices by Market Cap
      </h1>
      <div className="w-2/3 mx-auto relative transition-all duration-100">
        <i className="fa-solid fa-magnifying-glass text-slate-500 dark:text-yellow-500 absolute top-4 left-4 md:left-6 md:top-6"></i>
        <input
          type="text"
          className="w-full rounded-md shadow-md px-12 py-2 md:py-4 font-josefin text-xl border-2 dark:border-yellow-400 border-slate-500 focus:outline focus:outline-yellow-500 bg-transparent dark:text-yellow-500 text-slate-700 transition-all duration-100"
          value={searchField}
          onChange={(event) => {
            const value = event.target.value;
            setSearchField(value);
          }}
        />
      </div>
      <div className="w-2/3 mx-auto">
        <TableContainer className="rounded-md shadow-sm border-none">
          {loading ? (
            <LinearProgress className="dark:bg-yellow-500 bg-slate-600" />
          ) : (
            <>
              <Table className="rounded-md ">
                <TableHead className="dark:bg-yellow-400 bg-zinc-100 ">
                  <TableRow className="font-josefin ">
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (row) => (
                        <TableCell
                          key={row}
                          align={row === "Coin" ? "left" : "right"}
                          style={{
                            fontSize: "16px",
                            color: "black",
                            fontWeight: "600",
                            fontFamily: "Josefin Sans",
                          }}
                        >
                          {row}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
              </Table>
            </>
          )}
        </TableContainer>
      </div>
    </div>
  );
};

export default CoinTable;
