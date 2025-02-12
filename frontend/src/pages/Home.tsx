import { useState, useEffect } from "react";
// icons
import { FiSearch } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
// hooks
import { useAppDispatch, useAppSelector } from "../hooks";
// slices
import { userSelector } from "../features/users/usersSlice";
import {
  booksSelector,
  IBook,
  resetIsBookDeletingDone,
  isBookDeletingSelector,
  isBookDeletingDoneSelector,
  deleteBook,
  setIsBookEditOn,
} from "../features/books/booksSlice";
// components
// informatics
import GetUsername from "../components/informatics/GetUsername";
import GetProfile from "../components/informatics/GetProfile";
import GetDate from "../components/informatics/GetDate";
import IsUserOnline from "../components/informatics/IsUserOnline";

export default function Home() {
  // states
  // local states
  const [isBookDeleteOn, setIsBookDeleteOn] = useState<IBook | null>(null);
  // slices
  // users
  const user = useAppSelector(userSelector);
  // books
  const books = useAppSelector(booksSelector);
  const isBookDeleting = useAppSelector(isBookDeletingSelector);
  const isBookDeletingDone = useAppSelector(isBookDeletingDoneSelector);

  // hooks
  const dispatch = useAppDispatch();

  // effects
  useEffect(() => {
    if (isBookDeletingDone) {
      setIsBookDeleteOn(null);
    }
  }, [isBookDeletingDone]);
  return (
    <div className="flex-1 flex flex-col">
      {/* header */}
      <header className="flex items-center justify-between mb-3.5">
        {/* left */}
        <div className="w-[40%]">
          {/* search */}
          <div className="flex items-center gap-x-0.5 border border-neutral-200 rounded-sm p-1.5 bg-white">
            <FiSearch className="text-xl text-neutral-500" />
            <input
              className="w-full focus:ring-0 focus:outline-none border-none text-sm"
              type="text"
              placeholder="Search books"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center gap-x-3">
          <button className="px-1.5 py-1 rounded-sm bg-white shadow-sm text-sm text-neutral-500 cursor-pointer border-2 border-white">
            All Books
          </button>
          <button className="px-1.5 py-1 rounded-sm bg-white shadow-sm text-sm text-neutral-500 cursor-pointer border-2 border-white">
            Educational
          </button>
          <button className="px-1.5 py-1 rounded-sm bg-white shadow-sm text-sm text-neutral-500 cursor-pointer border-2 border-white">
            Fictions
          </button>
        </div>
      </header>
      {/* books list */}
      <div className="flex-1 pr-1.5 max-h-[82vh] overflow-y-auto">
        {books.length > 0 ? (
          <>
            {books.map((bookItem) => {
              return (
                <div key={bookItem._id} className="mb-10">
                  {/* book content */}
                  <div className="grid grid-cols-5">
                    {/* left */}
                    <div className="w-full h-full">
                      <img
                        className="w-full h-full object-center object-cover"
                        src={bookItem.file}
                        alt=""
                      />
                    </div>
                    {/* right */}
                    <div className="col-span-4 bg-white px-3 py-1 flex flex-col justify-between">
                      <div>
                        <header className="flex items-center justify-between">
                          {/* left */}
                          <div>
                            <p>
                              <span className="py-1 border-b border-neutral-300">
                                {bookItem.title}
                              </span>{" "}
                              by{" "}
                              <span className="text-sm text-neutral-400">
                                {bookItem.author}
                              </span>
                            </p>
                          </div>
                          {/* date */}
                          <div className="w-fit px-3 py-0.5 rounded-full text-xs bg-green-50/50 text-green-600">
                            <span>{bookItem.total} available books</span>
                          </div>
                        </header>
                        <div className="my-3">
                          <p className="text-sm text-neutral-700">
                            {bookItem.description}
                          </p>
                        </div>
                      </div>
                      <footer className="flex items-end justify-between">
                        <div className="flex items-center gap-x-1 text-sm">
                          <div className="relative">

                          <div className="w-[28px] aspect-square rounded-full overflow-hidden shrink-0">
                            <GetProfile _id={bookItem.user} flag="pro" />
                          </div>
                          <IsUserOnline _id={bookItem.user}/>
                          </div>
                          <div className="text-xs">
                            <p>
                              <GetUsername _id={bookItem.user} />
                            </p>
                            <p className="-mt-0.5 text-neutral-400 flex items-center gap-x-0.5">
                              <CiClock2 />
                              <span>
                                <GetDate date={bookItem.date} />
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* actions */}
                        <div className="flex items-center gap-x-3">
                          {/* like */}
                          <button className="flex items-center gap-x-0.5 cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                            <span className="text-sm">12</span>
                            <AiOutlineLike className="text-lg" />
                          </button>
                          {/* favorite */}
                          <button className="flex items-center gap-x-0.5 cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                            <MdFavoriteBorder className="text-lg" />
                          </button>
                          {/* comment */}
                          <button className="flex items-center gap-x-0.5 cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                            <span className="text-sm">7</span>
                            <FaRegMessage className="text-sm" />
                          </button>
                          {/* add to borrow */}
                          <button className="flex items-center gap-x-0.5 cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                            <span className="text-sm">add</span>
                            <IoCartOutline className="text-xl" />
                          </button>
                          {/* edit book */}
                          {user?._id === bookItem.user && (
                            <button
                              className="flex items-center gap-x-0.5 cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500"
                              onClick={() => {
                                // setIsBookDeleteOn(bookItem);
                                dispatch(setIsBookEditOn(bookItem));
                              }}
                            >
                              <span className="text-sm">edit</span>
                              <AiOutlineEdit className="text-xl" />
                            </button>
                          )}
                          {/* delete book */}
                          {user?._id === bookItem.user && (
                            <button
                              className="flex items-center gap-x-0.5 cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-red-500"
                              onClick={() => {
                                setIsBookDeleteOn(bookItem);
                                dispatch(setIsBookEditOn(null));
                                dispatch(resetIsBookDeletingDone());
                              }}
                            >
                              <BsTrash3 />
                            </button>
                          )}
                        </div>
                      </footer>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>No Books</div>
        )}
      </div>
      {/* delete conformation */}
      {isBookDeleteOn && (
        <div
          className={`fixed  left-0 top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-black/50 z-30 `}
        >
          <div className={`w-96 shrink-0 bg-white rounded-md p-5 relative`}>
            {/* close btn */}
            <button
              className="absolute right-1.5 top-1.5 flex items-center justify-center w-[24px] cursor-pointer rounded-sm aspect-square bg-neutral-100 text-neutral-400 transition-colors ease-in-out duration-150 hover:bg-red-200 hover:text-red-500"
              onClick={() => {
                setIsBookDeleteOn(null);
              }}
            >
              <AiOutlineClose />
            </button>
            {/* book detail */}
            <div className="flex items-center gap-x-1.5">
              {/* img */}
              <div className="w-[50px] aspect-square rounded-sm overflow-hidden">
                <img
                  className="w-full h-full object-center object-cover"
                  src={isBookDeleteOn?.file}
                  alt=""
                />
              </div>
              {/* title & author */}
              <div>
                <p className="text-neutral-500 font-medium">
                  {isBookDeleteOn.title}
                </p>
                <p className="text-sm">
                  by{" "}
                  <span className="text-stone-500">
                    {isBookDeleteOn.author}
                  </span>
                </p>
              </div>
            </div>
            {/* warning text */}
            <div className="my-1.5 text-sm italic text-neutral-700">
              <p>
                Are you sure you want to delete this book? Remember the actions
                is undone.
              </p>
            </div>
            {/* buttons */}
            <div className="flex items-center gap-x-5 mt-3">
              <button
                disabled={isBookDeleting}
                className="px-5 py-0.5 rounded-full text-sm bg-red-500 text-white cursor-pointer transition-colors ease-in-out duration-150 hover:bg-red-400"
                onClick={() => {
                  dispatch(deleteBook(isBookDeleteOn._id));
                }}
              >
                {isBookDeleting ? (
                  <div className="w-[18px] aspect-square rounded-full shrink-0 border border-white animate-spin border-r-transparent" />
                ) : (
                  <span>Yes</span>
                )}
              </button>
              <button
                onClick={() => {
                  setIsBookDeleteOn(null);
                }}
                className="px-5 py-0.5 rounded-full text-sm bg-neutral-500 text-white cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
