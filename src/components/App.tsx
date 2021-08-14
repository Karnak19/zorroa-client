import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { GET_TOKENS } from '../graphql/tokens.query';
import Spinner from './commons/spinner/Spinner';
import TokenList from './tokens/TokenList';
import useMagic from '../hooks/useMagic';

function App() {
  const { data, loading, refetch } = useQuery(GET_TOKENS, {
    onError: async () => {
      await reauth();
      await refetch();
    },
  });
  const { reauth } = useMagic();

  const total: number = useMemo(
    () =>
      data?.tokens.reduce(
        (prev: any, curr: any) => prev + curr.quantity * curr.coinInfos.current_price,
        0,
      ),
    [data],
  );

  return (
    <div>
      {loading && <Spinner />}
      {!loading && (
        <>
          <TokenList tokens={data.tokens} total={total} />
        </>
      )}
    </div>
  );
}

export default App;
