import MovieBanner from "~/components/layout/components/Movies/MovieBanner";
import MovieTopicGrid from "~/components/layout/components/Movies/MovieTopicGrid";

const Home = () => {
  return (
    <div>
      <MovieBanner />
      <MovieTopicGrid />
    </div>
  );
};

export default Home;