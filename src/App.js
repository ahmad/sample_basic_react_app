import { HashRouter, Routes, Route } from "react-router-dom";

import "./components/css/AddProfile.css"
import { AddProfile } from "./components/AddProfile"
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { RecordFound } from "./components/RecordFound";

function App(props) {
  return (
	<HashRouter basename="/">
		<Routes>
			<Route path="/" element={<Layout />} >
				<Route index element={<Home />} />
				<Route path="found" element={<RecordFound />} />
				<Route path="add" element={<AddProfile />} />
			</Route>
		</Routes>
	</HashRouter>
  );
}

export default App;
