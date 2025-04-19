import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '~/store';
import AppRoutes from '~/routes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Header/>
        <div className="app">
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;