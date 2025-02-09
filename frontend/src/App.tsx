import { Routes, Route } from "react-router-dom";
// pages
import PrivateRoutes from "./pages/PrivateRoutes";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Routes>
        <Route path="/authentication" element={<Authentication />}></Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
