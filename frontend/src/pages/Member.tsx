// icons
import { FaRegHandPointLeft } from "react-icons/fa";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
// users
import {
  userSelector,
  isMemberSelectedSelector,
  updateUserRole,
} from "../features/users/usersSlice";
// components
import GetUsername from "../components/informatics/GetUsername";
import GetProfile from "../components/informatics/GetProfile";

// utils
import {leftSideBarTogglerHandler} from '../utils/handlers'

export default function Member() {
  // states
  // slices
  // users
  const user = useAppSelector(userSelector);
  const isMemberSelected = useAppSelector(isMemberSelectedSelector);

  // hooks
  const dispatch = useAppDispatch();

  return (
    <div className="px-1.5">
      {isMemberSelected ? (
        <div>
          {/* profile */}
          <div>
            {/* bg */}
            <div className="w-full h-[130px] overflow-hidden rounded-md">
              <GetProfile _id={isMemberSelected._id} flag="bg" />
            </div>
            {/* profile */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-x-3">
              {/* image */}
              <div className="w-[72px] shrink-0 aspect-square rounded-full overflow-hidden border-4 border-white shadow-md md:ml-5 mt-[-36px] relative z-30">
                <GetProfile _id={isMemberSelected._id} flag="pro" />
              </div>
              {/* user detail and action */}
              <div className="flex flex-col sm:flex-row gap-y-1.5 items-center gap-x-3">
                {/* username and email */}
                <div className="text-sm text-neutral-600">
                  <span>
                    <GetUsername _id={isMemberSelected._id} />
                  </span>{" "}
                  |{" "}
                  <span>
                    <GetUsername _id={isMemberSelected._id} flag="ema" />
                  </span>{" "}
                  |{" "}
                  <span className="text-xs text-neutral-400">
                    {isMemberSelected.role}
                  </span>
                </div>
                {/* action */}
                {user?.role === "super" && (
                  <button
                    className="px-3 py-0.5 rounded-sm text-sm bg-neutral-200 text-neutral-500 transition-colors ease-in-out duration-150 hover:bg-green-500 hover:text-white cursor-pointer"
                    onClick={() => {
                      dispatch(
                        updateUserRole({
                          _id: isMemberSelected._id,
                          role:
                            isMemberSelected.role === "normal"
                              ? "sub"
                              : "normal",
                        })
                      );
                    }}
                  >
                    <span>
                      {isMemberSelected.role === "normal"
                        ? "make sub-admin"
                        : isMemberSelected.role === "sub"
                        ? "make normal"
                        : ""}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-1.5">
            <h3 className="font-semibold text-neutral-400">Select Member</h3>
            <button className="border border-neutral-300 text-neutral-400 transition-colors ease-in-out duration-200 hover:border-neutral-500 hover:text-neutral-500 cursor-pointer rounded-full flex items-center justify-center w-12 aspect-square" onClick={leftSideBarTogglerHandler}>
              <FaRegHandPointLeft className="text-3xl"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
