import Hero from "../components/Hero.jsx";
import StorySection from "../components/StorySection.jsx";

const Home = () => {
  return (
    <div className="glass-card p-6 border border-white/10 pb-14 space-y-12">
      <Hero />
      <StorySection />
    </div>
  );
};

export default Home;
