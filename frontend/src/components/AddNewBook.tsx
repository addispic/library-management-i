import { useState, useEffect } from "react";
// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
// users
import { userSelector } from "../features/users/usersSlice";
// books
import {
  addNewBook,
  isBookUploadingSelector,
  isBookUploadingDoneSelector,
  resetIsBookUploadingDone,
  isBookEditOnSelector,
  setIsBookEditOn,
  updateBook,
} from "../features/books/booksSlice";
// utils
import { rightSideBarToggler } from "../utils/handlers";
export default function AddNewBook() {
  // states
  // slices
  // users
  const user = useAppSelector(userSelector);
  // books
  const isBookUploading = useAppSelector(isBookUploadingSelector);
  const isBookUploadingDone = useAppSelector(isBookUploadingDoneSelector);
  const isBookEditOn = useAppSelector(isBookEditOnSelector);
  // local
  const [file, setFile] = useState<any>(null);
  const [focus, setFocus] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [total, setTotal] = useState("");
  const [isbn, setIsbn] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState({
    options: [
      {
        text: "Educational",
      },
      {
        text: "Fiction",
      },
    ],
    selected: "",
    isOn: false,
  });
  const [description, setDescription] = useState("");
  // error
  const [error, setError] = useState("");

  // hooks
  const dispatch = useAppDispatch();

  // effect
  useEffect(() => {
    if (isBookUploadingDone) {
      rightSideBarToggler();
      setFile(null);
      setFocus("");
      setTitle("");
      setAuthor("");
      setTotal("");
      setIsbn("");
      setDate("");
      setCategory((prev) => {
        return {
          ...prev,
          selected: "",
          isOn: false,
        };
      });
      setDescription("");
      dispatch(setIsBookEditOn(null));
    }
  }, [isBookUploadingDone]);

  useEffect(() => {
    if (isBookEditOn) {
      setTitle(isBookEditOn.title);
      setAuthor(isBookEditOn.author);
      setTotal(isBookEditOn.total.toString());
      setIsbn(isBookEditOn.isbn);
      setDate(isBookEditOn.date);
      setCategory((prev) => {
        return {
          ...prev,
          selected: isBookEditOn.category,
        };
      });
      setDescription(isBookEditOn.description);
    }
  }, [isBookEditOn]);

  // handlers
  // file input handler
  const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  // cancel handler
  const cancelHandler = () => {
    setFile(null);
    setFocus("");
    setTitle("");
    setAuthor("");
    setTotal("");
    setIsbn("");
    setDate("");
    setCategory((prev) => {
      return {
        ...prev,
        selected: "",
        isOn: false,
      };
    });
    setDescription("");
    dispatch(setIsBookEditOn(null));
  };

  // submit handler
  const addNewBookHandler = () => {
    dispatch(resetIsBookUploadingDone());
    if (
      title &&
      author &&
      total &&
      isbn &&
      date &&
      category.selected &&
      description
    ) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("total", total);
      formData.append("isbn", isbn);
      formData.append("date", date);
      formData.append("book", file);
      formData.append("description", description);
      formData.append("category", category.selected);
      setError("");
      if (isBookEditOn) {
        formData.append("_id", isBookEditOn._id);
        dispatch(updateBook(formData));
      } else {
        if (!file) {
          setError("All form fields are required");
        } else {
          dispatch(addNewBook(formData));
        }
      }
    } else {
      setError("All from fields are required");
    }
  };
  return (
    <div className="p-3 relative">
      {user?.role === "normal" && (
        <div className="absolute inset-1.5 rounded-md overflow-hidden flex items-center justify-center z-30 bg-black/70 font-black text-white">
          <div className="flex flex-col items-center justify-center gap-1.5">
            <BsEmojiSmileUpsideDown className="text-5xl text-neutral-400" />
            <h3>Not allowed!!!</h3>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute left-1/2 -translate-x-1/2 top-3">
          <div className={`flex flex-col items-center justify-center bg-white p-3 rounded-sm shadow-2xl z-[100] relative transition-transform ease-in-out duration-150 ${error ? "scale-100" : "scale-0"}`}>
            <button
              className="absolute top-1.5 right-1.5 text-neutral-400 hover:text-red-500 cursor-pointer text-xl"
              onClick={() => {
                setError("");
              }}
            >
              <IoMdClose />
            </button>
            <CiWarning className="text-xl text-red-500" />
            <p className="text-center text-sm text-red-500">{error}</p>
          </div>
        </div>
      )}
      {/* header */}
      <header className="py-0.5 border-b border-neutral-200 text-neutral-400">
        <h3 className="font-medium">
          {isBookEditOn ? "Update Book Detail" : "Publish New Book"}
        </h3>
      </header>
      {/* form */}
      <div className="mt-5">
        {/* cover image */}
        <div>
          {/* preview */}
          <input
            type="file"
            id="book-cover-image"
            accept="images/*"
            hidden
            onChange={fileInputHandler}
          />
          <label
            htmlFor="book-cover-image"
            className={`flex items-center p-1 border  rounded-sm hover:border-green-500 gap-x-3 cursor-pointer text-sm  transition-colors ease-in-out duration-300 hover:text-green-500 ${
              file || isBookEditOn?.file
                ? "border-green-500 text-green-500"
                : "border-neutral-200 text-neutral-400"
            }`}
          >
            <div className="w-[32px] aspect-square rounded-md overflow-hidden">
              <img
                className="w-full h-full object-center object-cover"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : isBookEditOn
                    ? isBookEditOn.file
                    : "https://www.freeiconspng.com/uploads/vector-for-free-use-red-book-icon-29.png"
                }
                alt=""
              />
            </div>
            <span>Select Book Cover Image</span>
          </label>
        </div>
        {/* book title & Author */}
        <div className="mt-5 flex items-center gap-x-3">
          {/* title */}
          <div
            className={`w-[50%] p-1.5 border rounded-md transition-colors ease-in-out duration-300 ${
              !true
                ? "border-red-500"
                : focus === "title" || title
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="w-full focus:ring-0 focus:outline-none text-sm text-neutral-700"
              type="text"
              placeholder="Book title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onFocus={() => {
                setFocus("title");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
          {/* author */}
          <div
            className={`w-[50%] p-1.5 border rounded-md transition-colors ease-in-out duration-300 ${
              !true
                ? "border-red-500"
                : focus === "author" || author
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="w-full focus:ring-0 focus:outline-none text-sm text-neutral-700"
              type="text"
              placeholder="Book author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              onFocus={() => {
                setFocus("author");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
        </div>
        {/* book ISBN  & total */}
        <div className="mt-5 flex items-center gap-x-3">
          {/* ISB */}
          <div
            className={`w-[50%] p-1.5 border rounded-md transition-colors ease-in-out duration-300 ${
              !true
                ? "border-red-500"
                : focus === "isbn" || isbn
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="w-full focus:ring-0 focus:outline-none text-sm text-neutral-700"
              type="text"
              placeholder="Book ISBN"
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
              onFocus={() => {
                setFocus("isbn");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
          {/* total */}
          <div
            className={`w-[50%] p-1.5 border rounded-md transition-colors ease-in-out duration-300 ${
              !true
                ? "border-red-500"
                : focus === "total" || total
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="w-full focus:ring-0 focus:outline-none text-sm text-neutral-700"
              type="number"
              placeholder="Available books"
              value={total}
              onChange={(e) => {
                setTotal(e.target.value);
              }}
              onFocus={() => {
                setFocus("total");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
        </div>
        {/* date & category */}
        <div className="mt-5 flex items-center gap-x-3">
          {/* date */}
          <div
            className={`w-[50%] p-1.5 border rounded-md transition-colors ease-in-out duration-300 relative overflow-hidden ${
              !true
                ? "border-red-500"
                : focus === "date" || date
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="w-full focus:ring-0 focus:outline-none text-sm text-neutral-700"
              type="date"
              placeholder="Publish date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              onFocus={() => {
                setFocus("date");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
            {!date && (
              <div className="absolute left-0 z-10 top-0 h-full w-[75%] bg-white text-sm text-neutral-400 flex items-center px-1.5">
                <span>Publish date</span>
              </div>
            )}
          </div>
          {/* category */}
          <div
            className={`w-[50%] p-1.5 border rounded-md transition-colors ease-in-out duration-300 relative text-sm ${
              !true
                ? "border-red-500"
                : focus === "category" || category.selected
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            {/* text */}
            <div
              className="flex items-center justify-between cursor-pointer text-neutral-500"
              onClick={() => {
                setCategory((prev) => {
                  return {
                    ...prev,
                    isOn: !prev.isOn,
                  };
                });
              }}
            >
              <span>{category.selected || "Select category"}</span>
              <MdKeyboardArrowDown
                className={`text-2xl transition-transform ease-in-out duration-150 ${
                  category.isOn ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {/* options */}
            <div
              className={`absolute left-0 top-[105%] w-full bg-white border border-neutral-300 rounded-sm transition-transform ease-in-out duration-150 ${
                category.isOn ? "scale-100" : "scale-0"
              }`}
            >
              {category.options.map((item) => {
                return (
                  <div
                    key={item.text}
                    className="p-1.5 border-b border-neutral-300 last:border-transparent cursor-pointer hover:bg-neutral-100"
                    onClick={() => {
                      setCategory((prev) => {
                        return {
                          ...prev,
                          selected: item.text,
                          isOn: false,
                        };
                      });
                    }}
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* book description */}
        <div className="mt-5">
          <div
            className={`p-1.5 border rounded-md transition-colors ease-in-out duration-300 ${
              !true
                ? "border-red-500"
                : focus === "description" || description
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <textarea
              className="w-full h-[80px] focus:ring-0 focus:outline-none text-sm resize-none"
              placeholder="Book description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onFocus={() => {
                setFocus("description");
              }}
              onBlur={() => {
                setFocus("");
              }}
            ></textarea>
          </div>
        </div>
        {/* buttons */}
        <div className="mt-3 flex items-center justify-between">
          <button
            disabled={isBookUploading}
            className="text-sm px-5 py-1.5 bg-green-600 rounded-sm overflow-hidden text-white transition-colors ease-in-out duration-150 hover:bg-green-500 cursor-pointer"
            onClick={addNewBookHandler}
          >
            {isBookUploading ? (
              <div className="w-[20px] aspect-square rounded-full shrink-0 border-2 border-neutral-200 border-r-transparent animate-spin" />
            ) : (
              <span>{isBookEditOn ? "Save Changes" : "Publish"}</span>
            )}
          </button>
          <button
            className="text-sm px-5 py-1.5 bg-neutral-600 rounded-sm overflow-hidden text-white transition-colors ease-in-out duration-150 hover:bg-neutral-500 cursor-pointer"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
