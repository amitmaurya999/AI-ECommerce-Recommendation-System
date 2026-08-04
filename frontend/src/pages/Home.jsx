import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import RecommendationList from "../components/recommendation/RecommendationList";
import Footer from "../components/layout/Footer";
import PersonalizedRecommendations from "../components/recommendation/PersonalizedRecommendations";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PersonalizedRecommendations />
      <RecommendationList />
      <Footer />
    </>
    
  );
};

export default Home;