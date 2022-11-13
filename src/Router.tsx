import { Home } from './pages/Home/Home';
import { History } from './pages/History/History';
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
