import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../contexts/blockContext";
import { useNavigate } from "react-router-dom";
import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ThemeState } from "../contexts/themeContext";

const CoinTable = () => {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [page, setPage] = useState(1);
  const { currency, currencySymbol } = CryptoState();
  const navigate = useNavigate();
  const { theme } = ThemeState();

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

  const handleSearch = () => {
    return coinList?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchField.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchField.toLowerCase())
    );
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // calling fetcFunction
  useEffect(() => {
    fetchingAllCoin();
  }, [currency]);

  return (
    <div className="flex flex-col space-y-6 py-10">
      <h1 className="dark:text-white text-zinc-800 text-xl md:text-3xl font-semibold w-10/12 md:w-2/3 mx-auto text-center">
        Cryptocurrency Prices by Market Cap
      </h1>
      <div className="w-10/12 md:w-2/3  mx-auto relative transition-all duration-100">
        <i className="fa-solid fa-magnifying-glass text-slate-500 dark:text-yellow-500 absolute top-4 left-4 md:left-6 md:top-6"></i>
        <input
          type="text"
          className="w-full rounded-md shadow-md px-12 py-2 md:py-4 font-dm text-xl border-2 dark:border-yellow-400 border-slate-500 focus:outline focus:outline-yellow-500 bg-transparent dark:text-yellow-500 text-slate-700 transition-all duration-100"
          value={searchField}
          placeholder="Search a coin"
          onChange={(event) => {
            const value = event.target.value;
            setSearchField(value);
          }}
        />
      </div>
      <div className=" w-10/12 md:w-2/3 mx-auto scroll-smooth">
        <TableContainer className="rounded-md shadow-sm border-none">
          {loading ? (
            <LinearProgress className="dark:bg-yellow-500 bg-slate-600" />
          ) : (
            <>
              <Table className="rounded-md ">
                <TableHead className="dark:bg-yellow-400 bg-zinc-100 ">
                  <TableRow className="font-dm ">
                    {["Coin", "Price", "24h", "Mrkt Cap"].map((row) => (
                      <TableCell
                        key={row}
                        align={row === "Coin" ? "left" : "right"}
                        style={{
                          fontSize: "16px",
                          color: "black",
                          fontWeight: "600",
                          fontFamily: "DM Sans",
                        }}
                      >
                        {row}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className="dark:bg-transparent bg-white dark:text-yellow-500 text-zinc-700 text-lg hover:bg-slate-200 dark:hover:bg-zinc-700 cursor-pointer"
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                              fontFamily: "DM Sans",
                              fontWeight: "600",
                            }}
                            align="left"
                            className=" dark:text-white text-zinc-700 text-md md:text-lg font-semibold font-lato"
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              className="h-10 md:h-16"
                            />
                            <div className="flex flex-col space-y-2">
                              <span className="capitalize text-sm ">
                                {row.symbol}
                              </span>
                              <span className="text-sm ">{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell
                            align="right"
                            className="dark:text-white text-zinc-700 text-md md:text-lg font-semibold font-lato"
                          >
                            {currencySymbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color:
                                profit > 0
                                  ? "rgb(14, 203, 129)"
                                  : "rgb(242, 75, 103)",
                              fontWeight: 600,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            align="right"
                            className="dark:text-white text-zinc-700 text-md md:text-lg font-semibold font-lato"
                          >
                            {currencySymbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>

        <Pagination
          count={Number(handleSearch()?.length / 10).toFixed(0)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            color: "white",
            backgroundColor: `${theme === "dark" ? "gold" : "transparent"}`,
            borderRadius: "10px",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll({
              top: 400,
              behavior: "smooth",
            });
          }}
        />
      </div>
    </div>
  );
};

export default CoinTable;
