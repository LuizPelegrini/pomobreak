import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function Default() {
  return (
    <div>
      <Header />
      {/* this is a placeholder for all pages that uses this layout */}
      <Outlet />
    </div>
  );
}
