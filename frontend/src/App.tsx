import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// hooks
import { useAppDispatch, useAppSelector } from "./hooks";
// slices
// users
import {
  checkingAuthenticationSelector,
  isUserAuthenticated,
} from "./features/users/usersSlice";
// pages
import PrivateRoutes from "./pages/PrivateRoutes";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
export default function App() {
  // states
  // slices
  // users
  const checkingAuthentication = useAppSelector(checkingAuthenticationSelector);
  // hooks
  const dispatch = useAppDispatch();

  // effects
  useEffect(() => {
    dispatch(isUserAuthenticated());
  }, []);
  if (checkingAuthentication) return <div>Authenticating...</div>;
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
