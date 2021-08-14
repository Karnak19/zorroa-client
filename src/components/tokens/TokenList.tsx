import React from 'react';
import Card from '../commons/Card';
import CardContent from './CardContent';

interface IProps {
  tokens: Array<any>;
  total: number;
}

function TokenList({ tokens, total }: IProps) {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-4">
        {tokens.map((token) => {
          const { coinInfos, ...rest } = token;
          const { prices, ...restCoinInfos } = coinInfos;

          return (
            <Card title={`${coinInfos.name} ${coinInfos.symbol}`} key={token.id}>
              <CardContent {...rest} {...restCoinInfos} last_week_price={prices[0].price} />
            </Card>
          );
        })}
      </div>
      <div className="mt-4">
        <Card title="Total">{total.toFixed(2)} $</Card>
      </div>
    </>
  );
}

export default TokenList;
