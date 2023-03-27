import axios from "axios";
import { PersonalCryptoTypes } from "../types/personalCryptoTypes";

const cryptoIds = {
  //10%
  near: "near",
  xrd: "radix",
  dot: "polkadot",
  mnw: "morpheus-network",
  //5%
  rose: "oasis-network",
  gns: "gns",
  ckb: "nervos-network",
  atom: "cosmos",
  fetch: "fetchai",
  rmrk: "rmrk",
  vai: "vaiot",
  //2.5%
  rndr: "render-token",
  dydx: "dydx",
  uos: "ultra",
  rio: "realio-network",
  chng: "chaing",
  trias: "trias-token",
  azero: "aleph-azero",
  wit: "witnet",
  dmtr: "dimitra",
  dag: "constellation",
};



export const getCryptoData = async () => {
  try {
    const cryptoIdsString = Object.values(cryptoIds).join("%2C");
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIdsString}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&price_change_percentage=24h%2C7d`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
    return null;
  }
};
