import { useState } from "react";
import { useNavigate } from "react-router-dom";
// icons
import { RiBookShelfFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { MdOutlineFavorite } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { FaBoxOpen } from "react-icons/fa";
// hooks
import { useAppDispatch, useAppSelector } from "../hooks";
// slices
// user
import {userSelector} from '../features/users/usersSlice'
// menu
import { menuIdSetter } from "../features/menu/menuSlice";
// utils
import {leftSideBarTogglerHandler} from '../utils/handlers'
export default function Menu() {
  // states
  // local states
  const [menu, setMenu] = useState({
    options: [
      {
        icon: RiBookShelfFill,
        text: "Books store",
        path: "/",
      },
      {
        icon: SiBookstack,
        text: "My Books",
        path: "/my-books",
      },
      {
        icon: MdOutlineFavorite,
        text: "My Favorites",
        path: "/my-favorites",
      },
      {
        icon: FaBoxOpen,
        text: "Actions",
        path: "/actions",
      },
      {
        icon: ImUsers,
        text: "Members",
        path: "/members",
      },
    ],
    selected: "Books store",
  });
  // slices
  const user = useAppSelector(userSelector)

  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // navigation handler
  const navigationHandler = (text: string, path: string) => {
    setMenu((prev) => {
      return {
        ...prev,
        selected: text,
      };
    });
    navigate(path);
    if (text === "Members") {
      dispatch(menuIdSetter("members"));
    } else {
      dispatch(menuIdSetter("normal"));
      leftSideBarTogglerHandler()
    }
  };
  return (
    <div className="flex-1 border-t border-neutral-200 pt-3">
      {menu.options.map((item) => {
        if(user?.role !== "super" && item.text === "Actions") return null
        return (
          <div
            key={item.text}
            className={`flex items-center gap-x-3 p-1.5 px-1.5 cursor-pointer border-b  transition-colors ease-in-out duration-150  relative after:absolute after:left-0 after:top-0 after:h-full after:w-[3px]  ${
              menu.selected === item.text
                ? "after:bg-green-500 bg-green-50 text-green-500 hover:text-green-600 border-neutral-200"
                : "after:bg-transparent bg-transparent text-neutral-500 hover:text-neutral-700 border-neutral-200 hover:border-neutral-400"
            }`}
            onClick={() => {
              navigationHandler(item.text, item.path);
              
            }}
          >
            {/* icon */}
            <div>
              <item.icon className="text-lg " />
            </div>
            {/* text */}
            <div className="text-sm">
              <span>{item.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
