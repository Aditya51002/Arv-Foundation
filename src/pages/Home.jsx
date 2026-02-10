import Hero from "../components/Hero.jsx";
import StorySection from "../components/StorySection.jsx";
import DriveAnnouncementPopup from "../components/DriveAnnouncementPopup.jsx";
// Parallax moved into StorySection to avoid transforming the heading
// (wrapping the whole StorySection caused the heading to be translated under the fixed navbar)
import Timeline from "../components/Timeline.jsx";

const Home = () => {
  return (
    <div className="pb-14 space-y-12">
      <DriveAnnouncementPopup />
      <Hero />
      <StorySection />
      <Timeline />
    </div>
  );
};

export default Home;
