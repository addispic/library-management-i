import { useState } from "react";
// icons
import { FaCamera } from "react-icons/fa";
import { LuArrowLeftToLine } from "react-icons/lu";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
// users
import { userSelector } from "../features/users/usersSlice";
// profiles
import {
  newProfile,
  isProfileUploadingSelector,
} from "../features/profiles/profilesSlice";
// components
import AddNewBook from "./AddNewBook";
// informatics
import GetProfile from "./informatics/GetProfile";
import { rightSideBarToggler } from "../utils/handlers";

export default function RightSideBar() {
  // states
  // local states
  const [flag, setFlag] = useState("");
  // slices
  // users
  const user = useAppSelector(userSelector);
  // profiles
  const isProfileUploading = useAppSelector(isProfileUploadingSelector);
  // hooks
  const dispatch = useAppDispatch();

  // handlers
  const profileSubmitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("flag", flag);
    if (e.target.files && e.target.files[0]) {
      formData.append("profile", e.target.files[0]);
    }
    dispatch(newProfile(formData));
  };

  return (
    <div
      className="absolute right-0 top-0 w-0 bg-black/50 z-40 lg:bg-transparent flex justify-end overflow-hidden lg:relative lg:w-96 shrink-0 h-full transition-all ease-in-out duration-150"
      id="right-side-bar"
      onClick={() => {
        rightSideBarToggler();
      }}
    >
      <div className="px-1.5 lg:px-5 py-1.5 h-full w-96 lg:w-full">
        <div
          className="h-full w-full bg-white shadow-2xl rounded-md overflow-hidden flex flex-col relative"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            className="absolute top-1.5 left-1.5 z-40 lg:hidden  border border-neutral-200 rounded-sm p-1 text-neutral-400 cursor-pointer transition-colors ease-in-out duration-150 bg-neutral-200 hover:border-neutral-500 hover:bg-neutral-500 hover:text-white"
            onClick={() => {
              rightSideBarToggler();
            }}
          >
            <LuArrowLeftToLine className="rotate-180" />
          </button>
          {/* bg image */}
          <div className="w-full h-[120px] overflow-hidden relative">
            {/* image picker */}
            <input
              type="file"
              accept="image/*"
              hidden
              id="bg-image-picker"
              onChange={profileSubmitHandler}
            />
            {isProfileUploading && flag === "bg" ? (
              <div className="absolute right-3 top-3 w-[24px] aspect-square shrink-0 flex items-center justify-center bg-white/80 rounded-full">
                <div className="w-[16px] aspect-square rounded-full shrink-0 border-2 border-green-500 border-r-transparent animate-spin" />
              </div>
            ) : (
              <label
                htmlFor="bg-image-picker"
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => {
                  setFlag("bg");
                }}
              >
                <div className="w-[24px] aspect-square shrink-0 flex items-center justify-center bg-white/50 rounded-full text-sm">
                  <FaCamera />
                </div>
              </label>
            )}
            <GetProfile _id={user?._id as string} flag="bg" />
          </div>
          {/* profile */}
          <div className="pl-7">
            <div className="w-[84px] aspect-square border-4 border-white shadow-2xl rounded-full overflow-hidden relative z-20 mt-[-42px]">
              {/* image picker */}
              <input
                type="file"
                accept="image/*"
                hidden
                id="profile-image-picker"
                onChange={profileSubmitHandler}
              />
              {isProfileUploading && flag === "pro" ? (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[24px] aspect-square shrink-0 flex items-center justify-center bg-white/80 rounded-full">
                  <div className="w-[16px] aspect-square rounded-full shrink-0 border-2 border-green-500 border-r-transparent animate-spin" />
                </div>
              ) : (
                <label
                  htmlFor="profile-image-picker"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer"
                  onClick={() => {
                    setFlag("pro");
                  }}
                >
                  <div className="w-[24px] aspect-square shrink-0 flex items-center justify-center bg-white/80 rounded-full text-sm">
                    <FaCamera />
                  </div>
                </label>
              )}
              <GetProfile _id={user?._id as string} flag="pro" />
            </div>
          </div>
          {/* publish new book */}
          <AddNewBook />
        </div>
      </div>
    </div>
  );
}
