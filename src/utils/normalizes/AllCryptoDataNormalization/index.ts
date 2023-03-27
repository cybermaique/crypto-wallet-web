import { AllCryptoTypes } from "../../../types/allCryptoTypes";

export const normalizeAllCryptoData = (rawData: any[]): AllCryptoTypes => {
  return rawData.map((crypto: any) => {
    const normalizedCrypto = {
      ath_change_percentage: crypto.ath_change_percentage,
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      image: crypto.image,
      current_price: crypto.current_price,
      market_cap: crypto.market_cap,
      market_cap_rank: crypto.market_cap_rank,
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      percentage_supply_consumed: (crypto.circulating_supply / crypto.max_supply) * 100,
      price_change_percentage_7d_in_currency: crypto.price_change_percentage_7d_in_currency,
      last_updated: crypto.last_updated,
      sparkline_in_7d: {
        price: crypto.sparkline_in_7d.price,
      },
    };

    return normalizedCrypto;
  });
};
