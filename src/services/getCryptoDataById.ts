import axios from "axios";

export const getCryptoDataById = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
      );
      return response.data;
    } catch (error) {
      console.error(`Error ao obter dados da API para ${id}:`, error);
      return null;
    }
  };