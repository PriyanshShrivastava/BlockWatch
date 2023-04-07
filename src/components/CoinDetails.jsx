import React, { useEffect, useState } from "react";
import { CryptoState } from "../contexts/blockContext";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  PointElement,
  LineController,
  LineElement,
  LinearScale,
} from "chart.js";
Chart.register(
  CategoryScale,
  PointElement,
  LineController,
  LineElement,
  LinearScale
);
import { HistoricalChart } from "../config/api";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";

const CoinDetails = ({ token }) => {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState();
  const { currency } = CryptoState();

  const fetchGraphData = async () => {
    try {
      if (token) {
        const { data } = await axios.get(
          HistoricalChart(token?.id, days, currency)
        );
        setChartData(data?.prices);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(chartData);
  useEffect(() => {
    fetchGraphData();
  }, [days, token]);
  return (
    <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:px-6">
      {/* Charts  */}
      {!chartData ? (
        <CircularProgress
          className="dark:text-yellow-500 text-slate-200"
          size={250}
          thickness={2}
        />
      ) : (
        <>
          <Line
            style={{ width: "100%" }}
            data={{
              labels: chartData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return context.parsed.y;
                    },
                  },
                },
              },
            }}
          />
        </>
      )}

      {/* buttons  */}
      <div className="flex space-x-4 mt-10 mb-6">
        <button
          className="dark:border-2 dark:border-yellow-500 bg-transparent border-2 border-slate-500 dark:text-white px-4 transition-all duration-100 md:px-8 py-2 rounded-md shadow-md font-josefin text-sm md:text-md dark:hover:bg-yellow-400 dark:hover:text-black dark:hover:font-semibold hover:bg-slate-200"
          value={1}
          onClick={(event) => setDays(event.target.value)}
        >
          24 Hours
        </button>
        <button
          className="dark:border-2 dark:border-yellow-500 bg-transparent border-2 border-slate-500 dark:text-white px-4 transition-all duration-100 md:px-8 py-2 rounded-md shadow-md font-josefin text-sm md:text-md dark:hover:bg-yellow-400 dark:hover:text-black dark:hover:font-semibold hover:bg-slate-200"
          value={30}
          onClick={(event) => setDays(event.target.value)}
        >
          1 Month{" "}
        </button>
        <button
          className="dark:border-2 dark:border-yellow-500 bg-transparent border-2 border-slate-500 dark:text-white px-4 transition-all duration-100 md:px-8 py-2 rounded-md shadow-md font-josefin text-sm md:text-md dark:hover:bg-yellow-400 dark:hover:text-black dark:hover:font-semibold hover:bg-slate-200"
          value={90}
          onClick={(event) => setDays(event.target.value)}
        >
          3 Month
        </button>
        <button
          className="dark:border-2 dark:border-yellow-500 bg-transparent border-2 border-slate-500 dark:text-white px-4 transition-all duration-100 md:px-8 py-2 rounded-md shadow-md font-josefin text-sm md:text-md dark:hover:bg-yellow-400 dark:hover:text-black dark:hover:font-semibold hover:bg-slate-200"
          value={365}
          onClick={(event) => setDays(event.target.value)}
        >
          1 year
        </button>
      </div>
    </div>
  );
};

export default CoinDetails;
