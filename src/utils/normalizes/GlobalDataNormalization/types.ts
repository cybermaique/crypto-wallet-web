/* eslint-disable camelcase */
export type InputData = {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
  };
};
