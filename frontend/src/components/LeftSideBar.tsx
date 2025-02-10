// icons
import { TbSettingsCog } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { GiBookmark } from "react-icons/gi";
// hooks
import { useAppSelector } from "../hooks";
// slices
import { menuIdSelector } from "../features/menu/menuSlice";
// components
import Menu from "./Menu";
import Members from "./Members";
export default function LeftSideBar() {
  // states
  // slices state
  // menu
  const menuId = useAppSelector(menuIdSelector);
  return (
    <div className="w-80 shrink-0 h-full">
      <div className="px-5 py-1.5 h-full w-full">
        <div className="h-full w-full bg-white shadow-2xl rounded-md overflow-hidden p-3 flex flex-col">
          {/* header */}
          <header className="flex items-center gap-x-1.5 pb-0.5">
            <div className="flex items-center gap-x-1.5 cursor-pointer text-green-500 transition-colors ease-in-out duration-150 hover:text-green-600 text-lg font-black">
              <GiBookmark />
              <h3>Library Management</h3>
            </div>
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
            <div className="flex items-center gap-x-3 text-neutral-500 cursor-pointer relative after:absolute after:left-0 after:top-0 after:h-full after:w-[32px] after:rounded-md after:bg-neutral-100 p-1.5 rounded-md overflow-hidden after:transition-all after:ease-in-out after:duration-200 hover:after:w-full">
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
