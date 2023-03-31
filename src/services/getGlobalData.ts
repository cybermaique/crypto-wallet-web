import axios from 'axios';
import normalizeGlobalData from '../utils/normalizes/GlobalDataNormalization';

const getGlobalData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/global');
    const normalizedData = normalizeGlobalData(response.data);
    return normalizedData;
  } catch (error) {
    console.error('Error getting global data:', error);
    return null;
  }
};

export default getGlobalData;
