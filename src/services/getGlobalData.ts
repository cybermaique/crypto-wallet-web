import axios from 'axios';

const getGlobalData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/global');
    return response.data;
  } catch (error) {
    console.error('Error getting global data:', error);
    return null;
  }
};

export default getGlobalData;
