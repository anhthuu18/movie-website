import MovieBanner from "~/components/layout/components/Movies/MovieBanner";
import MovieTopicGrid from "~/components/layout/components/Movies/MovieTopicGrid";
import MovieCountryGrid from "~/components/layout/components/Movies/MovieCountryGrid";
const Home = () => {
  return (
    <div>
      <MovieBanner />
      <MovieTopicGrid />
      <MovieCountryGrid />
    </div>
  );
};

export default Home;