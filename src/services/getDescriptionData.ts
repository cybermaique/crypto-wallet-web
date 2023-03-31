import axios from 'axios';

const getCoinData = async (id: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados da moeda:', error);
    return null;
  }
};

export default getCoinData;
