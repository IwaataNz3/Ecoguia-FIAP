import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;