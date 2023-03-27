import { NormalizedGlobalData } from "../../../types/globalCryptoTypes";
import { InputData } from "./types";

const formatCurrency = (value: number): string => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

const normalizeGlobalData = ({ data }: InputData): NormalizedGlobalData => {
  return {
    totalCryptocurrencies: data.active_cryptocurrencies,
    marketCap: formatCurrency(data.total_market_cap.usd),
    totalVolume: formatCurrency(data.total_volume.usd),
    btcDominance: Number(data.market_cap_percentage.btc).toFixed(1),
    ethDominance: Number(data.market_cap_percentage.eth).toFixed(1),
  };
};

export default normalizeGlobalData;
