import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { History } from '../pages/History';
import { Default } from '../layouts/Default';

export function Router() {
  return (
    <Routes>
      {/* Both Home and History pages will use the Default layout */}
      <Route path="/" element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
