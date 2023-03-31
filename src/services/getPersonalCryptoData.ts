import axios from 'axios';
import { PersonalCryptoTypes } from '../types/personalCryptoTypes';
import getDefiData from './getDefiData';

const cryptoIds = {
  // 10%
  near: 'near',
  xrd: 'radix',
  dot: 'polkadot',
  mnw: 'morpheus-network',
  // 5%
  rose: 'oasis-network',
  gns: 'gains-network',
  ckb: 'nervos-network',
  atom: 'cosmos',
  fet: 'fetch-ai',
  rmrk: 'rmrk',
  vai: 'vaiot',
  // 2.5%
  rndr: 'render-token',
  dydx: 'dydx',
  uos: 'ultra',
  rio: 'realio-network',
  chng: 'chainge-finance',
  trias: 'trias-token',
  azero: 'aleph-zero',
  wit: 'witnet',
  dmtr: 'dimitra',
  dag: 'constellation-labs',
};

const getPersonalCryptoData = async () => {
  try {
    const cryptoIdsString = Object.values(cryptoIds).join('%2C');
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIdsString}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&price_change_percentage=24h%2C7d`,
    );
    console.log('getPersonalCryptoData: ', response.data);

    const tvl = await getDefiData();
    console.log(tvl);

    console.log(response.data);

    const withTvl = response.data.map((item: PersonalCryptoTypes) => {
      const tvlItem = tvl.find((tvlObj) => {
        if (tvlObj.name === 'NEAR') console.log('NEAR');
        return tvlObj.symbol.toLocaleLowerCase() === item.symbol.toLocaleLowerCase();
      });

      if (tvlItem) {
        return {
          ...item,
          tvl: tvlItem.tvl,
        };
      }

      return {
        ...item,
        tvl: 'N/A',
      };
    });

    console.log('withTvl: ', withTvl);

    return withTvl;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    return null;
  }
};

export default getPersonalCryptoData;
