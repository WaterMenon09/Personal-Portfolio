import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Notfound from "./pages/404";

import { TRACKING_ID } from "./data/tracking";
import "./app.css";

if (TRACKING_ID !== "") {
	ReactGA.initialize(TRACKING_ID);
}

function App() {
	const location = useLocation();

	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.send({
				hitType: "pageview",
				page: window.location.pathname + window.location.search,
				title: document.title,
			});
		}
	}, [location.pathname, location.search]);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<About />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<Notfound />} />
			</Routes>
		</div>
	);
}

export default App;
