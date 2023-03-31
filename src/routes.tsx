import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonalWallet from './pages/PersonalWallet';
import AllCrypto from './pages/AllCrypto';
import Tvl from './pages/TvlCrypto';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PersonalWallet />} />
      <Route path="/all-cryptos" element={<AllCrypto />} />
      <Route path="/tvl" element={<Tvl />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
