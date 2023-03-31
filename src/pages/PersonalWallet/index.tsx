import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTheme } from '@mui/material/styles';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { PersonalCryptoTypes } from '../../types/personalCryptoTypes';
import getPersonalCryptoData from '../../services/getPersonalCryptoData';
import Header from '../../components/Header';
import normalizePersonalCryptoData from '../../utils/normalizes/PersonalCryptoDataNormalization';
import { GlobalData } from '../../types/globalCryptoTypes';
import getCoinData from '../../services/getDescriptionData';
import cryptoIdDataNormalization from '../../utils/normalizes/CryptoIdDataNormalization';
import { CoinDataTypes } from '../../types/cryptoIdDataTypes';

function PersonalWallet() {
  const theme = useTheme();

  const [cryptoData, setCryptoData] = useState<PersonalCryptoTypes[] | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalData, setGlobalData] = useState<GlobalData>({
    marketCap: '',
    totalCryptocurrencies: 0,
    totalVolume: '',
    btcDominance: '',
    ethDominance: '',
  });

  const [selectedCoinData, setSelectedCoinData] = useState<CoinDataTypes | null>(null);

  const fetchCryptoData = async () => {
    const rawData = await getPersonalCryptoData();

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
    }
    if (marketCap >= 1e9) {
      return `U$${(marketCap / 1e9).toFixed(1)}B`;
    }
    return `U$${(marketCap / 1e6).toFixed(1)}M`;
  };

  const handleRowClick = async (id: string) => {
    setSelectedCoinData(null);
    const coinData = await getCoinData(id);
    const normalizedCoinData = cryptoIdDataNormalization(coinData);
    setSelectedCoinData(normalizedCoinData);
  };

  const formatPercentageSupplyConsumed = (percentage: number) => {
    return percentage > 0 && percentage !== Infinity ? `${percentage.toFixed(1)}%` : '-';
  };

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>({
    key: 'percentageInvested',
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
    }
    return theme.palette.error.main + (isGraph7dCell ? '' : '33');
  };

  return (
    <Container maxWidth="xl">
      <Header data={globalData} />
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Minha wallet pessoal: {cryptoData?.length}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => requestSort('marketCapRank')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'marketCapRank' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    #
                  </Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'name' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Nome
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                onClick={() => requestSort('percentageInvested')}
                style={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'percentageInvested' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Porcentagem
                  </Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('currentPrice')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'currentPrice' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Preço
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                onClick={() => requestSort('priceChangePercentage24h')}
                style={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'priceChangePercentage24h' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    24h %
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                onClick={() => requestSort('priceChangePercentage7dInCurrency')}
                style={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'priceChangePercentage7dInCurrency' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    7D %
                  </Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => requestSort('marketCap')} style={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'marketCap' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Cap. de Mercado
                  </Typography>
                </Box>
              </TableCell>
              <TableCell style={{ cursor: 'default' }}>
                <Typography fontWeight="bold">Graph 7D</Typography>
              </TableCell>
              <TableCell
                onClick={() => requestSort('percentageSupplyConsumed')}
                style={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'percentageSupplyConsumed' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Moedas em circulação
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                onClick={() => requestSort('athChangePercentage')}
                style={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {sortConfig?.key === 'athChangePercentage' &&
                    (sortConfig.direction === 'ascending' ? (
                      <ArrowDropUpRoundedIcon />
                    ) : (
                      <ArrowDropDownRoundedIcon />
                    ))}
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    ATH %
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCryptoData ? (
              sortedCryptoData.map((coin) => {
                const prices = coin.sparklineIn7d.price;
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                const normalizedChartData = prices.map((price, index) => ({
                  value: ((price - minPrice) / (maxPrice - minPrice)) * 100,
                  day: index,
                }));

                return (
                  <TableRow key={coin.id} onClick={() => handleRowClick(coin.id)}>
                    <TableCell align="center">{coin.marketCapRank}</TableCell>
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
                        <Typography component="span">&bull; {coin.symbol.toUpperCase()}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {coin.percentageInvested.toFixed(1)}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        ${parseFloat(coin.currentPrice.toPrecision(3))}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: getBackgroundColorCell(
                          coin.priceChangePercentage24h,
                          false,
                        ),
                      }}
                    >
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {coin.priceChangePercentage24h.toFixed(2)}%
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: getBackgroundColorCell(
                          coin.priceChangePercentage7dInCurrency,
                          false,
                        ),
                      }}
                    >
                      <Typography component="span">
                        {coin.priceChangePercentage7dInCurrency.toFixed(2)}%
                      </Typography>
                    </TableCell>
                    <TableCell>{formatMarketCap(coin.marketCap)}</TableCell>
                    <TableCell>
                      <LineChart width={120} height={70} data={normalizedChartData}>
                        <XAxis dataKey="day" hide />
                        <YAxis hide />
                        <CartesianGrid vertical={false} horizontal={false} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={getBackgroundColorCell(
                            coin.priceChangePercentage7dInCurrency,
                            true,
                          )}
                          strokeWidth={1}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </TableCell>
                    <TableCell>
                      {formatPercentageSupplyConsumed(coin.percentageSupplyConsumed)}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: getBackgroundColorCell(coin.athChangePercentage, false),
                      }}
                    >
                      {coin.athChangePercentage} %
                    </TableCell>
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
      {selectedCoinData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {selectedCoinData?.name} - {selectedCoinData?.symbol.toUpperCase()}
          </Typography>
          <Typography>{selectedCoinData?.description}</Typography>
          <Box sx={{ mt: 2 }}>
            {selectedCoinData?.links?.twitterScreenName && (
              <Button
                component="a"
                href={`https://twitter.com/${selectedCoinData.links.twitterScreenName}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
              >
                Twitter
              </Button>
            )}
            {selectedCoinData?.links?.facebookUsername && (
              <Button
                component="a"
                href={`https://facebook.com/${selectedCoinData.links.facebookUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
              >
                Facebook
              </Button>
            )}
            {selectedCoinData?.links?.telegramChannelIdentifier && (
              <Button
                component="a"
                href={`https://t.me/${selectedCoinData.links.telegramChannelIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
              >
                Telegram
              </Button>
            )}
            {selectedCoinData?.links?.reposUrl?.github?.length > 0 &&
              selectedCoinData.links.reposUrl.github.map((repoUrl: string, index: number) => (
                <Button
                  key={selectedCoinData.id}
                  component="a"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                >
                  GitHub Repo {index + 1}
                </Button>
              ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default PersonalWallet;
