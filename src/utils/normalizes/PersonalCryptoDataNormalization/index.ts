import { PercentageInvestedKey } from '../../../types/percentageInvestedKeys';
import { PersonalCryptoTypes } from '../../../types/personalCryptoTypes';

const percentageInvested: Record<PercentageInvestedKey, number> = {
  near: 10,
  xrd: 10,
  dot: 10,
  mnw: 10,
  rose: 5,
  gns: 5,
  ckb: 5,
  atom: 5,
  fet: 5,
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

const normalizePersonalCryptoData = (rawData: any[]): PersonalCryptoTypes => {
  return rawData.map((crypto: any) => {
    const normalizedCrypto = {
      athChangePercentage: crypto.ath_change_percentage,
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      image: crypto.image,
      currentPrice: crypto.current_price,
      marketCap: crypto.market_cap,
      marketCapRank: crypto.market_cap_rank,
      percentageInvested: crypto.percentage_invested,
      percentageSupplyConsumed: (crypto.circulating_supply / crypto.max_supply) * 100,
      priceChangePercentage24h: crypto.price_change_percentage_24h,
      priceChangePercentage7dInCurrency: crypto.price_change_percentage_7d_in_currency,
      lastUpdated: crypto.last_updated,
      sparklineIn7d: {
        price: crypto.sparkline_in_7d.price,
      },
    };

    const percentageInvestedKey = crypto.symbol as PercentageInvestedKey;
    if (percentageInvested[percentageInvestedKey]) {
      return {
        ...normalizedCrypto,
        percentageInvested: percentageInvested[percentageInvestedKey],
      };
    }

    return normalizedCrypto;
  });
};

export default normalizePersonalCryptoData;
