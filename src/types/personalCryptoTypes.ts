export type PersonalCryptoTypes = {
  athChangePercentage: number;
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  percentageInvested: number;
  percentageSupplyConsumed: number;
  priceChangePercentage24h: number;
  priceChangePercentage7dInCurrency: number;
  lastUpdated: string;
  sparklineIn7d: {
    price: number[];
  };
}[];
