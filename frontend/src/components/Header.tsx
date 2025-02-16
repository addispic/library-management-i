// icons
import { CiMenuFries } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
// hooks
import { useAppSelector } from "../hooks";
// slices
// users
import {
  userSelector,
  isMemberSelectedSelector,
} from "../features/users/usersSlice";
// components
// informatics
import GetUsername from "./informatics/GetUsername";
import GetProfile from "./informatics/GetProfile";
// utils
import {
  leftSideBarTogglerHandler,
  rightSideBarToggler,
} from "../utils/handlers";
export default function Header() {
  // states
  // slices
  // users
  const user = useAppSelector(userSelector);
  const isMemberSelected = useAppSelector(isMemberSelectedSelector);
  return (
    <header className="py-1.5">
      <div className="bg-white shadow-md flex items-center justify-between px-3 py-1.5 rounded-sm overflow-hidden">
        {/* left */}
        <div className="flex items-center gap-x-3">
          {/* menu */}
          <button
            className="p-1 xl:hidden bg-neutral-50 text-neutral-600 text-xl shrink-0 rounded-md overflow-hidden cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-100 hover:text-neutral-700"
            onClick={() => {
              leftSideBarTogglerHandler();
            }}
          >
            <CiMenuFries className="rotate-180" />
          </button>

          {/* user */}
          {isMemberSelected && (
            <div className="hidden sm:flex items-center gap-x-1.5 text-sm text-neutral-500">
              <div className="shrink-0 w-[28px] aspect-square rounded-full overflow-hidden">
                <GetProfile _id={isMemberSelected._id} flag="pro" />
              </div>
              <p>
                <GetUsername _id={isMemberSelected._id} />
              </p>
            </div>
          )}
        </div>
        {/* right */}
        <div className="flex items-center gap-x-3">
          {/* user */}
          <div className="flex items-center gap-x-1.5 text-sm text-neutral-500">
            <p>
              <GetUsername _id={user?._id as string} />
            </p>
            <div className="shrink-0 w-[28px] aspect-square rounded-full overflow-hidden">
              <GetProfile _id={user?._id as string} flag="pro" />
            </div>
          </div>
          {/* menu */}
          <button
            className="p-1 bg-neutral-50 text-neutral-400 text-xl shrink-0 rounded-md overflow-hidden cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-100 hover:text-neutral-700 lg:hidden"
            onClick={() => {
              rightSideBarToggler();
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </header>
  );
}
