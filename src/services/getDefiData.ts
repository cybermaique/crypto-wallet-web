import axios from 'axios';
import { DefiProtocolTypes } from '../types/defiProtocolTypes';
import defiDataNormalization from '../utils/normalizes/DefiDataNormalization';

const getDefiData = async (): Promise<DefiProtocolTypes[]> => {
  const url = 'https://api.llama.fi/protocols';
  const response = await axios.get(url);

  const normalizedData = defiDataNormalization(response.data);
  console.log('tvl: ', normalizedData);

  return normalizedData;
};

export default getDefiData;
