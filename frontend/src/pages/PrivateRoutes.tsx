import { Outlet, Navigate } from "react-router-dom";

// hooks
import { useAppSelector } from "../hooks";

// slices
// users
import { userSelector } from "../features/users/usersSlice";

// components
import LeftSideBar from "../components/LeftSideBar";
import Header from "../components/Header";
import RightSideBar from "../components/RightSideBar";

export default function PrivateRoutes() {
  // states
  // slices
  // users
  const user = useAppSelector(userSelector);
  return (
    <div className="w-screen h-screen overflow-hidden">
      {user ? (
        <div className="w-screen h-screen flex relative">
          {/* left */}
          <LeftSideBar />
          {/* content */}
          <div className="flex-1 flex flex-col gap-y-1.5 relative">
            {/* header */}
            <Header />

            <Outlet />
          </div>
          {/* right */}
          <RightSideBar />
        </div>
      ) : (
        <Navigate to={"/authentication"} />
      )}
    </div>
  );
}
