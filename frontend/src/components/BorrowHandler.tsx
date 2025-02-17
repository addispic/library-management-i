import { useState, useEffect } from "react";
// icons
import { MdOutlineAddToPhotos } from "react-icons/md";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
import {
  iBorrowsSelector,
  addNewBorrow,
  resetIsNewBorrowUploadingDone,
  isNewBorrowUploadingSelector,
  isNewBorrowUploadingDoneSelector,
} from "../features/borrows/borrowsSlice";
import { IBook } from "../features/books/booksSlice";

export default function BorrowHandler({ bookItem }: { bookItem: IBook }) {
  // states
  //   local
  const [duration, setDuration] = useState("");
  const [isBorrowOn, setIsBorrowOn] = useState<IBook | null>(null);
  const [focus, setFocus] = useState("");
  // slices
  const iBorrows = useAppSelector(iBorrowsSelector);
  const isAlreadyBorrowed = iBorrows.find((br) => br.book === bookItem._id);
  const isNewBorrowUploading = useAppSelector(isNewBorrowUploadingSelector);
  const isNewBorrowUploadingDone = useAppSelector(
    isNewBorrowUploadingDoneSelector
  );

  // hooks
  const dispatch = useAppDispatch();

  // effects
  useEffect(() => {
    if (isNewBorrowUploadingDone) {
      setDuration("");
      setIsBorrowOn(null);
      dispatch(resetIsNewBorrowUploadingDone());
    }
  }, [isNewBorrowUploadingDone]);

  // handler
  // borrow submit handler
  const borrowSubmitHandler = () => {
    dispatch(addNewBorrow({ _id: bookItem._id, duration }));
  };
  return (
    <div>
      {isAlreadyBorrowed ? (
        <div
          className={`text-sm px-2 py-0.5 rounded-full ${
            isAlreadyBorrowed.status === "pending"
              ? "bg-orange-100 text-orange-600"
              : isAlreadyBorrowed.status === "active"
              ? "bg-green-200 text-green-500"
              : ""
          }`}
        >
          {isAlreadyBorrowed.status}
        </div>
      ) : (
        <button
          className="text-sm flex items-center gap-x-0.5 text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500 rounded-sm px-1 py-0.5 bg-neutral-100 hover:bg-green-100 cursor-pointer"
          onClick={() => {
            dispatch(resetIsNewBorrowUploadingDone());
            setIsBorrowOn(bookItem);
          }}
        >
          <span>borrow</span>
          <MdOutlineAddToPhotos className="text-lg" />
        </button>
      )}
      {isBorrowOn && (
        <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-black/30 z-50">
          <div className="w-80 bg-white rounded-md p-5">
            {/* header */}
            <header className="relative">
              <div className="flex items-center gap-x-1.5">
                {/* image */}
                <div className="w-[38px] aspect-square rounded-sm overflow-hidden">
                  <img
                    className="w-full h-full object-center object-cover"
                    src={bookItem.file}
                    alt=""
                  />
                </div>
                <div>
                  <p>{bookItem.title}</p>
                  <p className="text-sm text-neutral-500">
                    by <span>{bookItem.author}</span>
                  </p>
                </div>
              </div>
            </header>
            {/* form */}
            <div className="mt-2">
              <div
                className={`border rounded-md p-1.5 text-sm transition-colors ease-in-out duration-150 ${
                  focus === "duration" || duration
                    ? "border-green-500"
                    : "border-neutral-200"
                }`}
              >
                <input
                  className="w-full focus:outline-none focus:ring-0 bg-transparent"
                  type="number"
                  placeholder="For how long? (days)"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  onFocus={() => {
                    setFocus("duration");
                  }}
                  onBlur={() => {
                    setFocus("");
                  }}
                />
              </div>
              {/* buttons */}
              <div className="mt-3 flex items-center gap-x-1.5 text-sm">
                <button
                  disabled={
                    duration.trim() || isNewBorrowUploading ? false : true
                  }
                  className="px-3 py-0.5 rounded-sm bg-green-100 text-green-500 transition-colors ease-in-out duration-150 hover:text-white hover:bg-green-500 cursor-pointer"
                  onClick={() => {
                    borrowSubmitHandler();
                  }}
                >
                  {isNewBorrowUploading ? (
                    <div className="w-[16px] aspect-square rounded-full shrink-0 border-2 border-green-300 animate-spin border-r-transparent" />
                  ) : (
                    <span>Borrow</span>
                  )}
                </button>
                <button
                  className="px-3 py-0.5 rounded-sm bg-neutral-100 text-neutral-500 transition-colors ease-in-out duration-150 hover:text-white hover:bg-neutral-500 cursor-pointer"
                  onClick={() => {
                    setIsBorrowOn(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
