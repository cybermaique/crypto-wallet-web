import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { NormalizedGlobalData } from '../../types/globalCryptoTypes';

type HeaderProps = {
  data: NormalizedGlobalData;
};

const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">
              Total de Criptomoedas: {data.totalCryptocurrencies}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Cap. de Mercado: {data.marketCap}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Volume: {data.totalVolume}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Dominância: BTC {data.btcDominance}% ETH {data.ethDominance}%
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
