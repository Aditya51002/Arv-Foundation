import Hero from "../components/Hero.jsx";
import StorySection from "../components/StorySection.jsx";
import OngoingDrives from "../components/OngoingDrives.jsx";
import Branches from "../components/Branches.jsx";
/* mport PhotoGallery from "../components/PhotoGallery.jsx";
import PartnersSection from "../components/PartnersSection.jsx"; */
// Parallax moved into StorySection to avoid transforming the heading
// (wrapping the whole StorySection caused the heading to be translated under the fixed navbar)

const Home = () => {
  return (
    <div className="pb-14 space-y-12">
      <Hero />
      <StorySection />
      <OngoingDrives />
      <Branches />
    </div>
  );
};

export default Home;
