import React, { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';

import type { RootObject } from './types';
import Layout from './layout/Layout';
import Spinner from './commons/spinner/Spinner';
import Card from './commons/Card';
import SpanReward from './commons/SpanReward';
import Form from './Form';

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

  const hourly: ChartData = {
    labels: tokens?.capsHourlyResult
      ?.map((hour) => new Date(hour.month).toTimeString().split('GMT')[0])
      .reverse(),
    datasets: [
      {
        label: 'Today Hourly',
        data: tokens?.capsHourlyResult?.map((hour) => hour.value).reverse(),
        fill: true,
        backgroundColor: 'rgba(219, 39, 119, 0.5)',
        borderColor: 'rgba(219, 39, 119, 1)',
        tension: 0.2,
        borderCapStyle: 'round',
      },
    ],
  };

  const dayToDay: ChartData = {
    labels: tokens?.capsDailyResult
      ?.map((hour) => new Date(hour.month).toLocaleDateString())
      .reverse(),
    datasets: [
      {
        label: 'Day To Day',
        data: tokens?.capsDailyResult?.map((hour) => hour.value).reverse(),
        fill: true,
        backgroundColor: 'rgba(219, 39, 119, 0.5)',
        borderColor: 'rgba(219, 39, 119, 1)',
        borderWidth: 3,
      },
    ],
  };

  return (
    <Layout>
      <Card grid="col-span-4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <label className="pl-6">
            This is not an official Ternoa website.{' '}
            <span className="text-xs italic font-light">
              I uses their web API to retrieve data. No data is collected.
            </span>
          </label>
        </div>
      </Card>
      <Form value={wallet} handleChange={(e) => setWallet(e.target.value)} />
      {!wallet && !tokens.totalUserReward && <Spinner />}
      {wallet && tokens.totalUserReward && (
        <>
          <Card
            grid="lg:col-span-4 col-span-2 row-span-2 "
            className="text-center font-light text-3xl grid place-items-center p-10"
          >
            <p
              className="z-10"
              style={{
                position: 'inherit',
              }}
            >
              Today reward:{' '}
              <SpanReward
                amount={tokens.capsHourlyResult.reduce((p, c) => p + c.value, 0).toFixed(2)}
                size={4}
              />
            </p>
          </Card>
          <Card
            grid="col-span-2 row-span-2"
            className=" text-center font-semibold font-play text-6xl grid place-items-center"
          >
            <p className="z-10 text-white">APR: {tokens.APR.toFixed(2)} %</p>
          </Card>
          <Card
            logo
            grid="lg:col-span-2 col-span-4"
            className="text-xl text-center grid place-items-center"
          >
            <p style={{ zIndex: 10, position: 'inherit' }}>
              since{' '}
              {new Date(
                tokens.capsDailyResult[tokens.capsDailyResult.length - 1].month,
              ).toLocaleDateString()}
              : <SpanReward amount={tokens.totalUserReward.toFixed(2)} size={3} />
            </p>
          </Card>
          <Card
            logo
            grid="lg:col-span-2 col-span-4 lg:row-span-1"
            className="text-xl text-center grid place-items-center"
          >
            <p style={{ zIndex: 10, position: 'inherit' }}>
              CURRENT MONTH:{' '}
              <SpanReward
                amount={(
                  tokens.totalUserReward - (tokens.capsMonthlyResult[0]?.value || 0)
                ).toFixed(2)}
                size={3}
              />
            </p>
          </Card>
          <Card grid="lg:col-span-2 col-span-4">
            <Line data={hourly} />
          </Card>
          <Card grid="lg:col-span-2 col-span-4">
            <Bar data={dayToDay} />
          </Card>
        </>
      )}
    </Layout>
  );
}

export default App;
