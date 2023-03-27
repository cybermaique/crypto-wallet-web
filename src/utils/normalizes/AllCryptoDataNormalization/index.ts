import { AllCryptoTypes } from '../../../types/allCryptoTypes';

const normalizeAllCryptoData = (rawData: any[]): AllCryptoTypes => {
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
      priceChangePercentage24h: crypto.price_change_percentage_24h,
      percentageSupplyConsumed: (crypto.circulating_supply / crypto.max_supply) * 100,
      priceChangePercentage7dInCurrency: crypto.price_change_percentage_7d_in_currency,
      lastUpdated: crypto.last_updated,
      sparklineIn7d: {
        price: crypto.sparkline_in_7d.price,
      },
    };

    return normalizedCrypto;
  });
};

export default normalizeAllCryptoData;
