// icons
import { TbSettingsCog } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { GiBookmark } from "react-icons/gi";
import { LuArrowLeftToLine } from "react-icons/lu";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
import { menuIdSelector } from "../features/menu/menuSlice";
import { logout, setFormId } from "../features/users/usersSlice";
// components
import Menu from "./Menu";
import Members from "./Members";
// utils
import { leftSideBarTogglerHandler } from "../utils/handlers";
export default function LeftSideBar() {
  // states
  // slices state
  // menu
  const menuId = useAppSelector(menuIdSelector);
  // hooks
  const dispatch = useAppDispatch();
  return (
    <div
      className="absolute left-0 top-0 xl:relative overflow-hidden w-0 bg-black/50 xl:bg-transparent xl:w-80 shrink-0 h-full z-40 transition-all ease-in-out duration-150"
      id="left-side-bar"
      onClick={() => {
        leftSideBarTogglerHandler();
      }}
    >
      <div className="xl:px-5 px-1.5 py-1.5 h-full w-[18rem] xl:w-full">
        <div
          className="h-full w-full bg-white shadow-2xl rounded-md overflow-hidden p-3 flex flex-col"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* header */}
          <header className="flex items-center justify-between gap-x-1.5 pb-0.5">
            <div className="flex items-center gap-x-1.5 cursor-pointer text-green-500 transition-colors ease-in-out duration-150 hover:text-green-600 text-lg font-black">
              <GiBookmark />
              <h3>Library Management</h3>
            </div>
            {/* collapse btn */}
            <button className="border border-neutral-200 rounded-sm p-1 text-neutral-400 cursor-pointer transition-colors ease-in-out duration-150 hover:border-green-500 hover:text-green-500 xl:hidden" onClick={leftSideBarTogglerHandler}>
              <LuArrowLeftToLine />
            </button>
          </header>
          {menuId === "normal" ? (
            <div className="flex-1 flex flex-col gap-y-3.5">
              {/* menu */}
              <Menu />
            </div>
          ) : menuId === "members" ? (
            <Members />
          ) : null}
          {/* footer */}
          <footer className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-3 text-neutral-500 cursor-pointer relative after:absolute after:left-0 after:top-0 after:h-full after:w-[32px] after:rounded-md after:bg-neutral-100 p-1.5 rounded-md overflow-hidden after:transition-all after:ease-in-out after:duration-200 hover:after:w-full">
              {/* icon */}
              <TbSettingsCog className="text-xl relative z-10" />
              <span className="relative z-10">Settings</span>
            </div>
            <div
              className="flex items-center gap-x-3 text-neutral-500 cursor-pointer relative after:absolute after:left-0 after:top-0 after:h-full after:w-[32px] after:rounded-md after:bg-neutral-100 p-1.5 rounded-md overflow-hidden after:transition-all after:ease-in-out after:duration-200 hover:after:w-full"
              onClick={() => {
                dispatch(logout());
                dispatch(setFormId("login"))
              }}
            >
              {/* icon */}
              <IoExitOutline className="text-[1.3rem] relative z-10" />
              <span className="relative z-10">Logout</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
