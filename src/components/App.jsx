import React, { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';

import Layout from './layout/Layout';
import Spinner from './commons/spinner/Spinner';
import Card from './commons/Card';

function App() {
  const [tokens, setTokens] = React.useState({});
  const [wallet, setWallet] = useLocalStorage('wallet', '');

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://lprewards.ternoa.dev/api/rewards/getRewards?address=${wallet}`,
      );
      setTokens(data.BEP20);
    };

    getData();
  }, [wallet]);
  useEffect(() => {}, []);

  const dayToDay = {
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

  const hourly = {
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
          <Card className="col-span-4 p-10 text-3xl font-bold text-center">
            TOTAL: {tokens.totalUserReward.toFixed(2)} CAPS
          </Card>
          <Card className="col-span-2 text-center font-semibold text-primary text-xl">
            APR: {tokens.APR.toFixed(2)} %
          </Card>
          <Card className="col-span-2 text-center font-bold text-2xl">
            Today yield: {tokens.capsHourlyResult.reduce((p, c) => p + c.value, 0).toFixed(2)} CAPS
          </Card>
          <div className="card bg-base-200 p-10 lg:col-span-2 sm:col-span-4">
            <Line data={hourly} />
          </div>
          <div className="card bg-base-200 p-10 lg:col-span-2 sm:col-span-4">
            <Bar data={dayToDay} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default App;
