import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      {!true ? (
        <div className="w-screen h-screen flex">
          {/* left */}
          <div className="w-80 bg-red-200 shrink-0">LeftSideBar</div>
          {/* content */}
          <div className="flex-1 bg-blue-200">
            {/* header */}
            <header>Header</header>

            <Outlet />
          </div>
          {/* right */}
          <div className="w-96 bg-yellow-200">RightSideBar</div>
        </div>
      ) : (
        <Navigate to={"/authentication"} />
      )}
    </div>
  );
}
