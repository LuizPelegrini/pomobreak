import { ThemeProvider } from 'styled-components';

import { Router } from './components/Router';

import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
import { CyclesContextProvider } from './contexts/CyclesContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
}
