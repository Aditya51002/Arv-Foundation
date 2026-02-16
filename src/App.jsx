// App.jsx
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import DriveAnnouncementPopup from "./components/DriveAnnouncementPopup.jsx";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import WorkDetail from "./pages/WorkDetail.jsx";
import Initiatives from "./pages/Initiatives.jsx";
import InitiativeDetail from "./pages/InitiativeDetail.jsx";
import Donate from "./pages/Donate.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import Founder from "./pages/Founder.jsx";
import Partners from "./pages/Partners.jsx";
import PartnerDetail from "./pages/PartnerDetail.jsx";
import Services from "./pages/Services.jsx";
import Newsletter from "./pages/Newsletter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminGallery from "./pages/admin/AdminGallery.jsx";
import AdminDrives from "./pages/admin/AdminDrives.jsx";
import AdminContent from "./pages/admin/AdminContent.jsx";
import AdminInternships from "./pages/admin/AdminInternships.jsx";
import AdminPartnerships from "./pages/admin/AdminPartnerships.jsx";
import AdminContributions from "./pages/admin/AdminContributions.jsx";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// Main App Layout
const AppShell = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Blur Blobs */}
      <div className="app-blur-layer" aria-hidden="true">
        <div className="blur-blob -left-24 -top-16 h-72 w-72 bg-emerald-400/20" />
        <div className="blur-blob right-[-6%] top-12 h-80 w-80 bg-amber-300/20" />
        <div className="blur-blob left-[20%] bottom-[-10%] h-96 w-96 bg-emerald-300/15" />
      </div>

      <Navbar />

      <main className="page-wrapper pb-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/:slug" element={<PartnerDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes (protected) */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminProtectedRoute>
                <AdminGallery />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/drives"
            element={
              <AdminProtectedRoute>
                <AdminDrives />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <AdminProtectedRoute>
                <AdminContent />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/internships"
            element={
              <AdminProtectedRoute>
                <AdminInternships />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/partnerships"
            element={
              <AdminProtectedRoute>
                <AdminPartnerships />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/contributions"
            element={
              <AdminProtectedRoute>
                <AdminContributions />
              </AdminProtectedRoute>
            }
          />
          {/* Fallback route for unknown admin paths */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

// App Wrapper
const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
      <DriveAnnouncementPopup />
    </BrowserRouter>
  );
};

export default App;
