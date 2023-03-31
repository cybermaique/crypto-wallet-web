import axios from 'axios';

const getAllCryptoData = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=24h%2C7d`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error ao obter dados da API para todas as criptomoedas:', error);
    return null;
  }
};

export default getAllCryptoData;
