import React, { useMemo } from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/solid';

type IProps = {
  coin: string;
  id: string;
  quantity: number;
  symbol: string;
  large_image: string;
  current_price: number;
  name: string;
  last_week_price: number;
};

function Card({ current_price, last_week_price, quantity, large_image, symbol }: IProps) {
  const difference = useMemo(
    () => +((current_price / last_week_price) * 100 - 100).toFixed(1),
    [current_price, last_week_price],
  );

  return (
    <>
      <img
        src={large_image}
        alt={symbol}
        className="h-24 w-24 absolute opacity-70 -top-4 -right-4 transform rotate-12"
      />

      <div className="grid grid-cols-2 grid-rows-2">
        <p className="text-purple-100 dark:text-gray-100 text-4xl text-left font-bold my-4 col-span-1">
          ~ {Math.floor(current_price * quantity)}
          <span className="text-sm pl-1">$</span>
        </p>
        <p className="text-purple-100 dark:text-gray-100 text-2xl text-left font-light mb-2 col-span-1 row-start-2">
          {quantity} {symbol}
        </p>
        <p className="text-purple-100 dark:text-gray-100 text-xl text-left font-light mb-2 col-start-2 row-start-2">
          1 {symbol} = {current_price}$
        </p>
        <div
          className={`flex items-center ${
            difference >= 0 ? 'text-green-500' : ' text-red-500'
          } text-md`}
        >
          {difference >= 0 ? (
            <TrendingUpIcon className="text-green-500 h-10" />
          ) : (
            <TrendingDownIcon className="text-red-500 h-10" />
          )}
          <span>{difference}%</span>
          <span className="text-gray-300">/ 7d</span>
        </div>
      </div>
    </>
  );
}

export default Card;
