import { DefiProtocolTypes } from '../../../types/defiProtocolTypes';

interface RawDefiProtocol {
  id: string;
  name: string;
  symbol: string;
  tvl: number;
  mcap: number;
}

const defiDataNormalization = (rawData: RawDefiProtocol[]): DefiProtocolTypes[] => {
  return rawData.map((protocol) => ({
    id: protocol.id,
    name: protocol.name,
    symbol: protocol.symbol,
    tvl: protocol.tvl,
    marketCap: protocol.mcap,
  }));
};

export default defiDataNormalization;
