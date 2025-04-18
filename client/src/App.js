import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '~/store';
import AppRoutes from '~/routes';
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;