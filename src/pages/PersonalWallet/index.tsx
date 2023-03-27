import { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import { getCryptoData } from "../../services/getPersonalCrypto";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { PersonalCryptoTypes } from "../../types/personalCryptoTypes";
import { getCryptoDataById } from "../../services/getCryptoDataById";
import { useTheme } from '@mui/material/styles';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import Header from "../../components/Header";
import { normalizePersonalCryptoData } from "../../utils/normalizes/PersonalCryptoDataNormalization";
import { NormalizedGlobalData } from "../../types/globalCryptoTypes";

function PersonalWallet() {
  const theme = useTheme();

  const [cryptoData, setCryptoData] = useState<PersonalCryptoTypes | null>(null);

  const [globalData, setGlobalData] = useState<NormalizedGlobalData>({
    marketCap: "",
    totalCryptocurrencies: 0,
    totalVolume: "",
    btcDominance: "",
    ethDominance: ""
  });

  const fetchCryptoData = async () => {
    const rawData = await getCryptoData();

    if (rawData) {
      const normalizedCryptoData = normalizePersonalCryptoData(rawData);
      setCryptoData(normalizedCryptoData);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `U$${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `U$${(marketCap / 1e9).toFixed(1)}B`;
    } else {
      return `U$${(marketCap / 1e6).toFixed(1)}M`;
    }
  };

  const handleGetCoinData = (id: string) => {
    getCryptoDataById(id);
  }

  const formatPercentageSupplyConsumed = (percentage: number) => {
    return percentage > 0 && percentage !== Infinity ? `${percentage.toFixed(1)}%` : '-';
  };

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>({
    key: 'percentage_invested',
    direction: 'descending',
  });

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptoData = cryptoData
    ? [...cryptoData].sort((a, b) => {
      if (!sortConfig) return 0;

      const key = sortConfig.key as keyof typeof a;
      const order = sortConfig.direction === 'ascending' ? 1 : -1;

      if (a[key] < b[key]) return -1 * order;
      if (a[key] > b[key]) return 1 * order;
      return 0;
    })
    : null;

  const getBackgroundColorCell = (valueChange: number, isGraph7dCell: boolean) => {
    if (valueChange > 0) {
      return theme.palette.success.main + (isGraph7dCell ? '' : '33');
    } else {
      return theme.palette.error.main + (isGraph7dCell ? '' : '33');
    }
  };


  return (
    <Container maxWidth="xl" >
      <Header data={globalData} />
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Minha wallet pessoal
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => requestSort('market_cap_rank')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'market_cap_rank' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>#</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'name' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Nome</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('percentage_invested')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'percentage_invested' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Porcentagem</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('current_price')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'current_price' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Preço</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('price_change_percentage_24h')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'price_change_percentage_24h' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>24h %</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('price_change_percentage_7d_in_currency')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'price_change_percentage_7d_in_currency' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>7D %</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('market_cap')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'market_cap' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Cap. de Mercado</Typography>
                </Box>
              </TableCell>
              <TableCell style={{ cursor: 'default' }}><Typography fontWeight="bold">Graph 7D</Typography></TableCell>
              <TableCell onClick={() => requestSort('percentage_supply_consumed')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'percentage_supply_consumed' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Moedas em circulação</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('ath_change_percentage')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'ath_change_percentage' && (sortConfig.direction === 'ascending' ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />)}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>ATH %</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCryptoData ? (
              sortedCryptoData.map((coin) => {
                const prices = coin.sparkline_in_7d.price;
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                const normalizedChartData = prices.map((price, index) => ({
                  value: ((price - minPrice) / (maxPrice - minPrice)) * 100,
                  day: index,
                }));

                return (
                  <TableRow key={coin.id}
                    onClick={() => handleGetCoinData(coin.id)}
                  >
                    <TableCell align="center">{coin.market_cap_rank}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap', width: 'fit-content' }}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={coin.image}
                          alt={coin.name}
                          sx={{ width: 24, height: 24, marginRight: 1 }}
                        />
                        <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                          {coin.name}
                        </Typography>
                        <Typography component="span" >
                          &bull; {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {coin.percentage_invested.toFixed(1)}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        ${parseFloat(coin.current_price.toPrecision(3))}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: getBackgroundColorCell(coin.price_change_percentage_24h, false) }}
                    >
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: getBackgroundColorCell(coin.price_change_percentage_7d_in_currency, false) }}
                    >
                      <Typography component="span">
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                      </Typography>
                    </TableCell>
                    <TableCell>{formatMarketCap(coin.market_cap)}</TableCell>
                    <TableCell>
                      <LineChart
                        width={120}
                        height={70}
                        data={normalizedChartData}
                      >
                        <XAxis dataKey="day" hide />
                        <YAxis hide />
                        <CartesianGrid vertical={false} horizontal={false} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={getBackgroundColorCell(coin.price_change_percentage_7d_in_currency, true)}
                          strokeWidth={1}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </TableCell>
                    <TableCell>{formatPercentageSupplyConsumed(coin.percentage_supply_consumed)}</TableCell>
                    <TableCell sx={{ backgroundColor: getBackgroundColorCell(coin.ath_change_percentage, false) }} > {coin.ath_change_percentage} %</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>Carregando...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );


}


export default PersonalWallet;