import React, { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';

import type { RootObject } from './types';
import Layout from './layout/Layout';
import Spinner from './commons/spinner/Spinner';
import Card from './commons/Card';

function App() {
  const [tokens, setTokens] = React.useState({} as RootObject);
  const [wallet, setWallet] = useLocalStorage('wallet', '');

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get<{ BEP20: RootObject }>(
        `https://lprewards.ternoa.dev/api/rewards/getRewards?address=${wallet!.toLowerCase()}`,
      );
      setTokens(data.BEP20);
    };

    getData();
  }, [wallet]);
  useEffect(() => {}, []);

  const dayToDay: ChartData = {
    labels: tokens?.capsDailyResult
      ?.map((hour) => new Date(hour.month).toLocaleDateString())
      .reverse(),
    datasets: [
      {
        label: 'Day To Day',
        data: tokens?.capsDailyResult?.map((hour) => hour.value).reverse(),
        fill: true,
        backgroundColor: '#c807ed',
        borderColor: '#2b40fb',
      },
    ],
  };

  const hourly: ChartData = {
    labels: tokens?.capsHourlyResult
      ?.map((hour) => new Date(hour.month).toTimeString().split('GMT')[0])
      .reverse(),
    datasets: [
      {
        label: 'Today Hourly',
        data: tokens?.capsHourlyResult?.map((hour) => hour.value).reverse(),
        fill: true,
        backgroundColor: '#2b40fb',
        borderColor: '#c807ed',
      },
    ],
  };

  return (
    <Layout>
      <div className="alert alert-warning col-span-4">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2196f3"
            className="w-6 h-6 mx-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <label>
            This is not an official Ternoa website.{' '}
            <span className="text-xs italic font-light">
              I uses their web API to retrieve data. No data is collected.
            </span>
          </label>
        </div>
      </div>
      <div className="p-10 card bg-base-200 col-span-4 relative">
        <div className="absolute right-3 top-2 text-2xs">
          <a
            className="link link-primary"
            target="_blank"
            href="https://github.com/Karnak19/zorroa-client/tree/ternoa-lp"
          >
            Github
          </a>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">BEP20 wallet</span>
          </label>
          <input
            type="text"
            placeholder="BEP20 address"
            className="input input-bordered"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
      </div>
      {!wallet && !tokens.totalUserReward && <Spinner />}
      {wallet && tokens.totalUserReward && (
        <>
          <Card className="lg:col-span-2 col-span-4 lg:row-span-2 p-10 text-3xl font-bold text-center grid place-items-center">
            TOTAL: {tokens.totalUserReward.toFixed(2)} CAPS
          </Card>
          <Card className="col-span-2 text-center font-semibold text-primary text-xl grid place-items-center">
            <p
              className="z-10"
              style={{
                position: 'inherit',
              }}
            >
              APR: {tokens.APR.toFixed(2)} %
            </p>
          </Card>
          <Card className="col-span-2 text-center font-bold text-2xl grid place-items-center">
            <p
              className="z-10"
              style={{
                position: 'inherit',
              }}
            >
              Today reward: {tokens.capsHourlyResult.reduce((p, c) => p + c.value, 0).toFixed(2)}{' '}
              CAPS
            </p>
          </Card>
          <div className="card bg-base-200 p-6 lg:col-span-2 col-span-4">
            <Line data={hourly} />
          </div>
          <div className="card bg-base-200 p-6 lg:col-span-2 col-span-4">
            <Bar data={dayToDay} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default App;
