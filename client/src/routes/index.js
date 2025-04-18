import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import pages
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MovieDetail from '../pages/MovieDetail';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile';
import WatchList from '../pages/WatchList';
import NotFound from '../pages/NotFound';

// PrivateRoute HOC
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// PublicRoute HOC
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Route paths constant
export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  MOVIE_DETAIL: '/movie/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  WATCHLIST: '/watchlist',
  
  // Helper function for dynamic routes
  getMovieDetail: (id) => `/movie/${id}`,
};

// Main Routes component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.MOVIES} element={<Movies />} />
      <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetail />} />
      
      {/* Auth Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path={ROUTES.PROFILE}
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.WATCHLIST}
        element={
          <PrivateRoute>
            <WatchList />
          </PrivateRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;