import { useState } from "react";
import { useNavigate } from "react-router-dom";
// icons
import { FiSearch } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
// hooks
import { useAppDispatch } from "../hooks";
// slices
// menu
import { menuIdSetter } from "../features/menu/menuSlice";
export default function Members() {
  // states
  // local
  const [username, setUsername] = useState("");
  const [focus, setFocus] = useState("");
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
            navigate("/");
          }}
          className="text-neutral-400 transition-colors ease-in-out duration-150 hover:text-green-500 cursor-pointer text-xl"
        >
          <BsBoxArrowUpRight />
        </button>
      </header>
      {/* members list */}
      <div className="flex-1 max-h-[70vh] overflow-y-auto pr-1.5">
        {[1, 2, 3].map((item) => {
          return (
            <div
              key={item}
              className={`flex items-center gap-x-1.5 p-1.5 relative after:absolute after:left-0 after:top-0 after:h-full after:w-[3px] ${
                item === 2 ? "after:bg-green-500 " : "after:bg-transparent"
              }`}
            >
              {/* image */}
              <div className="w-[32px] aspect-square rounded-full overflow-hidden shrink-0 ">
                <img
                  className="w-full h-full object-center object-cover"
                  src="https://tse1.mm.bing.net/th?id=OIP.YIre5HGHiqBa7DCmrF4KwwHaJQ&pid=Api&P=0&h=220"
                  alt=""
                />
              </div>
              {/* text */}
              <div className="border-b border-neutral-300 w-full transition-colors ease-in-out duration-150 hover:border-green-500 cursor-pointer text-sm text-neutral-500">
                <p>Haddis</p>
                <p className="text-xs -mt-0.5 text-neutral-400">
                  Hello there how is ever...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
