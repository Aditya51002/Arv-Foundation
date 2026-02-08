import Hero from "../components/Hero.jsx";
import StorySection from "../components/StorySection.jsx";
import DriveAnnouncementPopup from "../components/DriveAnnouncementPopup.jsx";

const Home = () => {
  return (
    <div className="pb-14 space-y-12">
      <DriveAnnouncementPopup />
      <Hero />
      <StorySection />
    </div>
  );
};

export default Home;
