// src/components/Tvl.tsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import getDefiData from '../../services/getDefiData';
import formatValue from '../../utils/formatValue';
import { DefiProtocolTypes } from '../../types/defiProtocolTypes';

function Tvl() {
  const theme = useTheme();
  const [protocols, setProtocols] = useState<DefiProtocolTypes[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDefiData();
      setProtocols(data);
    };
    fetchData();
  }, []);

  const handleSortClick = () => {
    const sortedProtocols = [...protocols].sort((a, b) => {
      const aValue = a.marketCap !== undefined ? a.marketCap / a.tvl : -1;
      const bValue = b.marketCap !== undefined ? b.marketCap / b.tvl : -1;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setProtocols(sortedProtocols);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const filteredProtocols = protocols.filter(({ marketCap, tvl }) => {
    const marketCapTvlRatio: number = marketCap !== undefined ? marketCap / tvl : NaN;
    const value =
      !Number.isNaN(marketCapTvlRatio) &&
      marketCapTvlRatio > 0.001 &&
      Number.isFinite(marketCapTvlRatio);
    return value;
  });

  const getBackgroundColorCell = (valueChange: number, isGraph7dCell: boolean) => {
    if (valueChange > 0) {
      return theme.palette.success.main + (isGraph7dCell ? '' : '33');
    }
    return theme.palette.error.main + (isGraph7dCell ? '' : '33');
  };

  return (
    <div className="App">
      <h1>Criptomoedas & TVL</h1>
      <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: '#f7f7f7' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome da moeda</TableCell>
              <TableCell align="right">MarketCap</TableCell>
              <TableCell align="right">TVL</TableCell>
              <TableCell align="right" onClick={handleSortClick} style={{ cursor: 'pointer' }}>
                Índice MarketCap/TVL{' '}
                {sortDirection === 'asc' ? (
                  <ArrowDropUpRoundedIcon />
                ) : (
                  <ArrowDropDownRoundedIcon />
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProtocols.map(({ id, name, symbol, tvl, marketCap }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {name} ({symbol})
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: '#ffffff' }}>
                  ${formatValue(marketCap)}
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: '#ffffff' }}>
                  ${formatValue(tvl)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: getBackgroundColorCell((marketCap / tvl) * 100, false) }}
                >
                  {(marketCap / tvl).toFixed(5)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Tvl;
