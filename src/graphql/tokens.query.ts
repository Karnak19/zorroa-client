import gql from 'graphql-tag';

export const GET_TOKENS = gql`
  query GetTokens {
    tokens {
      id
      quantity
      coin
      coinInfos {
        current_price
        name
        symbol
        large_image
        prices {
          date
          price
        }
      }
    }
  }
`;
