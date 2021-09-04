import React from 'react';

function SpanReward({ amount, size }: { amount: number | string; size: 1 | 2 | 3 | 4 }) {
  const sizes = {
    1: 'text-xl',
    2: 'text-2xl',
    3: 'text-3xl',
    4: 'text-4xl',
  };
  return <span className={`text-white font-bold font-play ${sizes[size]}`}>{amount} CAPS</span>;
}

export default SpanReward;
