import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '~/store';
import AppRoutes from '~/routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;