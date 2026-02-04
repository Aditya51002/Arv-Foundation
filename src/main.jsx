import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext.jsx";

const root = document.getElementById("root");

if (root) {
	createRoot(root).render(
		<StrictMode>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</StrictMode>
	);
}
