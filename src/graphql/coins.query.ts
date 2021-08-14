import gql from 'graphql-tag';

export const GET_COIN = gql`
  query GetCoin($id: String!) {
    coin(id: $id) {
      current_price
      small_image
    }
  }
`;

export const GET_MULTIPLE_COINS = gql`
  query GetMultipleCoins($ids: [String!]!) {
    multipleCoins(ids: $ids) {
      name
      symbol
      small_image
      current_price
      prices {
        date
        price
      }
    }
  }
`;
