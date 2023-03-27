export type AllCryptoTypes = {
  athChangePercentage: number;
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  priceChangePercentage24h: number;
  percentageSupplyConsumed: number;
  priceChangePercentage7dInCurrency: number;
  lastUpdated: string;
  sparklineIn7d: {
    price: number[];
  };
}[];
