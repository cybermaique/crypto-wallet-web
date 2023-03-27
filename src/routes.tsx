import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonalWallet from './pages/PersonalWallet';
import AllCrypto from './pages/AllCrypto';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PersonalWallet />} />
      <Route path="/cryptos" element={<AllCrypto />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
