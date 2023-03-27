export type GlobalCryptoTypes = {
  active_cryptocurrencies: number;
  total_market_cap: number;
  total_volume: number;
  btc_dominance: number;
  eth_dominance: number;
};

export type NormalizedGlobalData = {
  marketCap: string;
  totalCryptocurrencies: number;
  totalVolume: string;
  btcDominance: string;
  ethDominance: string;
};
