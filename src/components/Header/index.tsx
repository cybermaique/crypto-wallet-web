import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { getGlobalData } from "../../services/getGlobalData";
import { GlobalCryptoTypes, NormalizedGlobalData } from "../../types/globalCryptoTypes";

type HeaderProps = {
    data: NormalizedGlobalData;
};

const Header: React.FC<HeaderProps> = ({ data }) => {

    console.log(data);

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
                        <Typography variant="h6">
                            Cap. de Mercado: {data.marketCap}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Volume: {data.totalVolume}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Dominância: BTC {data.btcDominance}% ETH {data.ethDominance}%
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <Typography variant="h6">
                            ETH Dominância: {data.ethDominance}%
                        </Typography>
                    </Grid> */}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;