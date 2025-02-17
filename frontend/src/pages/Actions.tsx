import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
// icons
import { CiClock1 } from "react-icons/ci";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsEmojiFrown } from "react-icons/bs";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";

// slices
// borrows
import {
  borrowsDetailSelector,
  updateBorrow,
  deleteBorrow,
} from "../features/borrows/borrowsSlice";
// users
import { userSelector } from "../features/users/usersSlice";

// components
import GetUsername from "../components/informatics/GetUsername";
import GetProfile from "../components/informatics/GetProfile";
import GetBookDetails from "../components/informatics/GetBookDetails";

export default function Actions() {
  // states
  // slices
  const borrowsDetail = useAppSelector(borrowsDetailSelector);
  const user = useAppSelector(userSelector);
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // effects
  useEffect(() => {
    if (user?.role === "normal") {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex-1 flex flex-col gap-y-1  px-1.5">
      {borrowsDetail?.length > 0 ? (
        <>
          {/* header */}
          <header className="flex items-center gap-x-3 pb-1.5 border-b border-neutral-200">
            {/* left */}
            <div className="flex items-center gap-x-3">
              {/* filters */}
              <div className="flex items-center gap-x-3">
                <button className="px-3 py-1 bg-neutral-200 rounded-sm text-neutral-500 text-sm transition-colors ease-in-out duration-150 hover:bg-neutral-300 hover:text-neutral-700 cursor-pointer">
                  All Requests
                </button>
                <button className="px-3 py-1 bg-neutral-200 rounded-sm text-neutral-500 text-sm transition-colors ease-in-out duration-150 hover:bg-neutral-300 hover:text-neutral-700 cursor-pointer">
                  Active Requests
                </button>
                <button className="px-3 py-1 bg-neutral-200 rounded-sm text-neutral-500 text-sm transition-colors ease-in-out duration-150 hover:bg-neutral-300 hover:text-neutral-700 cursor-pointer">
                  Pending Requests
                </button>
              </div>
            </div>
          </header>
          {/* content */}
          <div className="flex-1  pr-3 max-h-[83vh] overflow-y-auto">
            {borrowsDetail.map((borrowDetailItem) => {
              return (
                <div key={borrowDetailItem._id}>
                  <div className="bg-white flex gap-x-1.5">
                    <div className="border-r border-neutral-200">
                      <div className="w-[120px] aspect-square rounded-sm overflow-hidden">
                        <GetBookDetails
                          _id={borrowDetailItem.book}
                          flag="img"
                        />
                      </div>
                      <div className="px-1.5 pb-1.5">
                        <p>
                          <GetBookDetails
                            _id={borrowDetailItem.book}
                            flag="tit"
                          />
                        </p>
                        <p className="text-sm text-neutral-500">
                          by{" "}
                          <span className="text-green-600">
                            <GetBookDetails
                              _id={borrowDetailItem.book}
                              flag="aut"
                            />
                          </span>
                        </p>
                        <p className="text-xs text-neutral-500">
                          <GetBookDetails
                            _id={borrowDetailItem.book}
                            flag="cat"
                          />
                          (<span>category</span>)
                        </p>
                      </div>
                    </div>
                    {/* content */}
                    <div className="flex-1 text-sm text-neutral-700 p-1.5 flex flex-col justify-between gap-y-1.5">
                      <p>
                        <GetBookDetails
                          _id={borrowDetailItem.book}
                          flag="des"
                        />
                      </p>
                      {/* footer */}
                      <footer>
                        <div className="flex items-center gap-x-1.5">
                          <div className="w-[32px] aspect-square rounded-full overflow-hidden">
                            <GetProfile
                              _id={borrowDetailItem.user}
                              flag="pro"
                            />
                          </div>
                          <div>
                            <p>
                              <GetUsername _id={borrowDetailItem.user} />
                            </p>
                            <div className="text-sm text-neutral-500 -mt-1 flex items-center gap-x-1.5">
                              <span>
                                <GetUsername
                                  _id={borrowDetailItem.user}
                                  flag="ema"
                                />
                              </span>
                              <div className="flex items-center text-green-500 gap-x-0.5">
                                <CiClock1 />
                                <span>
                                  {formatDistanceToNow(
                                    new Date(borrowDetailItem.createdAt),
                                    { addSuffix: true }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </footer>
                    </div>
                  </div>
                  {/* actions */}
                  <div className="mb-5 mt-1.5 flex items-center gap-x-3">
                    <div className="flex items-center gap-x-3">
                      <div className="flex items-center gap-x-1 text-xs">
                        <span>status</span>
                        <div className="px-3 py-1 rounded-full overflow-hidden bg-neutral-200">
                          <span>{borrowDetailItem.status}</span>
                        </div>
                      </div>
                      {borrowDetailItem.status === "pending" ? (
                        <button
                          className="flex items-center gap-1.5 px-1.5 border border-green-500 rounded-md transition-colors ease-in-out duration-300 hover:bg-green-500 hover:text-white cursor-pointer py-0.5 text-sm bg-green-100 text-green-500"
                          onClick={() => {
                            if (
                              (user && user?.role === "super") ||
                              user?.role === "sub"
                            ) {
                              dispatch(
                                updateBorrow({
                                  _id: borrowDetailItem._id,
                                  status: "active",
                                })
                              );
                            }
                          }}
                        >
                          <FaArrowTrendUp />
                          <span>activate</span>
                        </button>
                      ) : borrowDetailItem.status === "active" ? (
                        <button
                          className="flex items-center gap-1.5 px-1.5 border border-red-500 rounded-md transition-colors ease-in-out duration-300 hover:bg-red-500 hover:text-white cursor-pointer py-0.5 text-sm bg-red-100 text-red-500"
                          onClick={() => {
                            if (
                              (user && user?.role === "super") ||
                              user?.role === "sub"
                            ) {
                              dispatch(deleteBorrow(borrowDetailItem._id));
                            }
                          }}
                        >
                          <RiDeleteBin2Line />
                          <span>Delete</span>
                        </button>
                      ) : null}
                    </div>
                    {/* duration and updated at */}
                    <div className="flex items-center gap-x-3">
                      <div className="flex items-center gap-x-0.5 text-sm text-neutral-500">
                        <span>duration: </span>
                        <span>{borrowDetailItem.duration} days</span>
                      </div>
                      <div className="text-sm flex items-center gap-x-0.5 text-orange-500">
                        <CiClock1 />
                        <span>
                          {formatDistanceToNow(
                            new Date(borrowDetailItem.updatedAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <div className="p-3 bg-white rounded-tl-3xl rounded-br-3xl">
            <div className="flex items-center justify-center text-5xl text-neutral-300">
              <BsEmojiFrown />
            </div>
            <div>
              <p className="text-neutral-500 italic">
              There are no actions to handle at the moment, but as soon as users start borrowing books from the library, actions will arise, and you will be able to manage them.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
