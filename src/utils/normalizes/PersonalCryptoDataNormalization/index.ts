import { PercentageInvestedKey } from "../../../types/percentageInvestedKeys";
import { PersonalCryptoTypes } from "../../../types/personalCryptoTypes";

const percentageInvested: Record<PercentageInvestedKey, number> = {
  near: 10,
  xrd: 10,
  dot: 10,
  mnw: 10,
  rose: 5,
  gns: 5,
  ckb: 5,
  atom: 5,
  fetch: 5,
  rmrk: 5,
  vai: 5,
  rndr: 2.5,
  dydx: 2.5,
  uos: 2.5,
  rio: 2.5,
  chng: 2.5,
  trias: 2.5,
  azero: 2.5,
  wit: 2.5,
  dmtr: 2.5,
  dag: 2.5,
};

export const normalizePersonalCryptoData = (rawData: any[]): PersonalCryptoTypes => {
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
      percentage_invested: crypto.percentage_invested,
      percentage_supply_consumed: (crypto.circulating_supply / crypto.max_supply) * 100,
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      price_change_percentage_7d_in_currency: crypto.price_change_percentage_7d_in_currency,
      last_updated: crypto.last_updated,
      sparkline_in_7d: {
        price: crypto.sparkline_in_7d.price,
      },
    };

    const percentageInvestedKey = crypto.symbol as PercentageInvestedKey;
    if (percentageInvested[percentageInvestedKey]) {
      return {
        ...normalizedCrypto,
        percentage_invested: percentageInvested[percentageInvestedKey],
      };
    }

    return normalizedCrypto;
  });
};
