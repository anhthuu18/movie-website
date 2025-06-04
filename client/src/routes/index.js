import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import pages
import Home from '~/pages/Home';
import Topic from '~/pages/Topic';
import MovieDetail from '~/pages/MovieDetail';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';
import Profile from '~/pages/Profile';
import WatchList from '~/pages/WatchList';

// Import layout
import DefaultLayout from '~/components/layout/DefaultLayout';

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
    TOPIC: '/chu-de',
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
            <Route
                path={ROUTES.HOME}
                element={
                    <DefaultLayout>
                        <Home />
                    </DefaultLayout>
                }
            />
            <Route
                path={ROUTES.TOPIC}
                element={
                    <DefaultLayout>
                        <Topic />
                    </DefaultLayout>
                }
            />
            <Route
                path={ROUTES.MOVIE_DETAIL}
                element={
                    <DefaultLayout>
                        <MovieDetail />
                    </DefaultLayout>
                }
            />
            <Route
                path={ROUTES.LOGIN}
                element={
                    <PublicRoute>
                        <DefaultLayout>
                            <Login />
                        </DefaultLayout>
                    </PublicRoute>
                }
            />
            <Route
                path={ROUTES.REGISTER}
                element={
                    <PublicRoute>
                        <DefaultLayout>
                            <Register />
                        </DefaultLayout>
                    </PublicRoute>
                }
            />

            {/* Private Routes */}
            <Route
                path={ROUTES.PROFILE}
                element={
                    <PrivateRoute>
                        <DefaultLayout>
                            <Profile />
                        </DefaultLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path={ROUTES.WATCHLIST}
                element={
                    <PrivateRoute>
                        <DefaultLayout>
                            <WatchList />
                        </DefaultLayout>
                    </PrivateRoute>
                }
            />

            {/* 404 Route */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;