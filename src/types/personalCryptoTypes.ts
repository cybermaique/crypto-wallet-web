export type PersonalCryptoTypes = {
  ath_change_percentage: number;
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  percentage_invested: number;
  percentage_supply_consumed: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}[];
