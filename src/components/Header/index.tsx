import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { HeaderProps } from './type';

const Header = ({
  data: { totalCryptocurrencies, marketCap, totalVolume, btcDominance, ethDominance },
}: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Total de Criptomoedas: {totalCryptocurrencies}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Cap. de Mercado: {marketCap}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Volume: {totalVolume}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Dominância: BTC {btcDominance}% ETH {ethDominance}%
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
