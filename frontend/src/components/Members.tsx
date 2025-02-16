import { useState } from "react";
import { useNavigate } from "react-router-dom";
// icons
import { FiSearch } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
// hooks
import { useAppDispatch, useAppSelector } from "../hooks";
// slices
// menu
import { menuIdSetter } from "../features/menu/menuSlice";
// users
import { usersSelector, userSelector , setIsMemberSelected,isMemberSelectedSelector} from "../features/users/usersSlice";
// components
// informatics
import GetUsername from "./informatics/GetUsername";
import GetProfile from "./informatics/GetProfile";
import IsUserOnline from "./informatics/IsUserOnline";
// utils
import { leftSideBarTogglerHandler } from "../utils/handlers";
export default function Members() {
  // states
  // local
  const [username, setUsername] = useState("");
  const [focus, setFocus] = useState("");
  // slices
  // users
  const users = useAppSelector(usersSelector);
  const user = useAppSelector(userSelector);
  const isMemberSelected = useAppSelector(isMemberSelectedSelector)
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex-1 border-t border-neutral-200 pt-3 flex flex-col">
      {/* header */}
      <header className="flex items-center gap-x-3 my-1.5">
        {/* search */}
        <div
          className={`flex-1 flex items-center gap-x-1.5 p-1 border  rounded-md text-sm transition-colors ease-in-out duration-150 ${
            focus === "username" || username
              ? "border-green-500"
              : "border-neutral-300"
          }`}
        >
          <FiSearch
            className={`text-xl  transition-colors ease-in-out duration-150 ${
              focus === "username" || username
                ? "text-green-500"
                : "text-neutral-400"
            }`}
          />
          <input
            className="w-full focus:outline-none focus:ring-0 border-none bg-transparent"
            type="text"
            placeholder="Search member"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onFocus={() => {
              setFocus("username");
            }}
            onBlur={() => {
              setFocus("");
            }}
          />
        </div>
        <button
          onClick={() => {
            dispatch(menuIdSetter("normal"));
            leftSideBarTogglerHandler()
            navigate("/");
          }}
          className="text-neutral-400 transition-colors ease-in-out duration-150 hover:text-green-500 cursor-pointer text-xl"
        >
          <BsBoxArrowUpRight />
        </button>
      </header>
      {/* members list */}
      <div className="flex-1 max-h-[70vh] overflow-y-auto pr-1.5">
        {users.length > 1 ? (
          <>
            {users.map((userItem) => {
              if (userItem._id === user?._id) return null;
              return (
                <div
                  key={userItem._id}
                  className={`flex items-center gap-x-1.5 p-1.5 relative after:absolute after:left-0 after:top-0 after:h-full after:w-[3px] ${
                    isMemberSelected?._id === userItem._id ? "after:bg-green-500 " : "after:bg-transparent"
                  }`}
                  onClick={() => {
                    leftSideBarTogglerHandler();
                    dispatch(setIsMemberSelected(userItem))
                  }}
                >
                  {/* image */}
                  <div className="relative">
                    <div className="w-[32px] aspect-square rounded-full overflow-hidden shrink-0 ">
                      <GetProfile _id={userItem._id} flag="pro" />
                    </div>
                    <IsUserOnline _id={userItem._id} />
                  </div>
                  {/* text */}
                  <div className="border-b border-neutral-300 w-full transition-colors ease-in-out duration-150 hover:border-green-500 cursor-pointer text-sm text-neutral-500">
                    <p>
                      <GetUsername _id={userItem._id} />
                    </p>
                    <p className="text-xs -mt-0.5 text-neutral-400">
                      Hello there how is ever...
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>No User Yet</div>
        )}
      </div>
    </div>
  );
}
