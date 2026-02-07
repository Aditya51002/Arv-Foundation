import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import WorkDetail from "./pages/WorkDetail.jsx";
import Initiatives from "./pages/Initiatives.jsx";
import InitiativeDetail from "./pages/InitiativeDetail.jsx";
import Donate from "./pages/Donate.jsx";
import Contact from "./pages/Contact.jsx";
import Founder from "./pages/Founder.jsx";
import Partners from "./pages/Partners.jsx";
import Services from "./pages/Services.jsx";
import Login from "./pages/Login.jsx";

const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);
	return null;
};

const AppShell = () => {
	return (
		<div className="min-h-screen relative">
			<div className="app-blur-layer" aria-hidden="true">
				<div className="blur-blob -left-24 -top-16 h-72 w-72 bg-emerald-400/20" />
				<div className="blur-blob right-[-6%] top-12 h-80 w-80 bg-amber-300/20" />
				<div className="blur-blob left-[20%] bottom-[-10%] h-96 w-96 bg-emerald-300/15" />
			</div>
			<Navbar />
			<main className="page-wrapper pb-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/work" element={<Work />} />
					<Route path="/work/:slug" element={<WorkDetail />} />
					<Route path="/initiatives" element={<Initiatives />} />
					<Route path="/initiatives/:slug" element={<InitiativeDetail />} />
					<Route path="/donate" element={<Donate />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/founder" element={<Founder />} />
					<Route path="/partners" element={<Partners />} />
					<Route path="/services" element={<Services />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<AppShell />
		</BrowserRouter>
	);
};

export default App;
