import { Home } from './pages/Home';
import { History } from './pages/History';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './pages/layouts/DefaultLayout';

export const Router = () => (
  <Routes>
    <Route path='/' element={<DefaultLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/history' element={<History />} />
    </Route>
  </Routes>
);
