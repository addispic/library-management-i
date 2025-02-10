import { useState, useEffect } from "react";

export default function AddNewBook() {
  // states
  // local states
  const [focus, setFocus] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [imageError, setImageError] = useState("");

  //   handlers

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (!image) return;

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // Clean up the URL when the component unmounts or the image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  //   cancel
  const cancelHandler = () => {
    setFocus("");
    setTitle("");
    setAuthor("");
    setNumber("");
    setImage(null);
    setPreview(null);
    setTitleError("");
    setAuthorError("");
    setNumberError("");
    setImageError("");
  };

  // submit handler
  const addNewBookSubmitHandler = () => {
    if (!title.trim()) {
      setTitleError("Book title required");
    } else {
      setTitleError("");
    }
    if (!author.trim()) {
      setAuthorError("Book author required");
    } else {
      setAuthorError("");
    }
    if (!number.trim()) {
      setNumberError("Total available books required");
    } else {
      setNumberError("");
    }
    if (!image) {
      setImageError("Please select book cover image");
    } else {
      setImageError("");
    }

    if (!titleError && !authorError && !numberError && !imageError) {
      console.log({ title, author, number, image });
    }
  };

  return (
    <div className="p-3">
      <h3 className="w-full text-lg font-medium border-b border-neutral-200 text-neutral-600">
        Publish New Book
      </h3>
      {/* form */}
      <div className="mt-5">
        {/* book title */}
        <div className="mb-3">
          <div
            className={`w-full flex items-center text-sm border rounded-sm p-1.5 transition-colors ease-in-out duration-150 ${
              titleError
                ? "border-red-500"
                : focus === "title" || title
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="flex-1 focus:outline-none focus:ring-0 border-none"
              type="text"
              placeholder="Book title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              onFocus={() => {
                setFocus("title");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
          <div className="text-sm text-red-500">{titleError}</div>
        </div>
        {/* book author */}
        <div className="mb-3">
          <div
            className={`w-full flex items-center text-sm border rounded-sm p-1.5 transition-colors ease-in-out duration-150 ${
              authorError
                ? "border-red-500"
                : focus === "author" || author
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="flex-1 focus:outline-none focus:ring-0 border-none"
              type="text"
              placeholder="Book author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                setAuthorError("");
              }}
              onFocus={() => {
                setFocus("author");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
          <div className="text-sm text-red-500">{authorError}</div>
        </div>
        {/* book number */}
        <div className="mb-3">
          <div
            className={`w-full flex items-center text-sm border rounded-sm p-1.5 transition-colors ease-in-out duration-150 ${
              numberError
                ? "border-red-500"
                : focus === "number" || number
                ? "border-green-500"
                : "border-neutral-300"
            }`}
          >
            <input
              className="flex-1 focus:outline-none focus:ring-0 border-none"
              type="number"
              placeholder="Total available books"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                setNumberError("");
              }}
              onFocus={() => {
                setFocus("number");
              }}
              onBlur={() => {
                setFocus("");
              }}
            />
          </div>
          <div className="text-sm text-red-500">{numberError}</div>
        </div>
        {/* book cover */}
        <input
          type="file"
          id="book-cover-image-picker"
          accept="images/*"
          hidden
          onChange={handleFileChange}
        />
        <label htmlFor="book-cover-image-picker" className="cursor-pointer">
          <div className="w-full h-[150px] overflow-hidden rounded-md border-2 border-neutral-300 relative">
            <h3
              className={`absolute top-1 right-1 px-1 py-1 text-sm bg-white  shadow-2xl rounded-md overflow-hidden ${
                imageError
                  ? "text-red-500"
                  : image
                  ? "text-green-600"
                  : "text-neutral-400"
              }`}
            >
              {imageError ? imageError : "Select book cover image"}
            </h3>
            <img
              className="w-full h-full object-center object-cover"
              src={
                preview
                  ? preview
                  : "https://static.vecteezy.com/system/resources/previews/007/165/331/original/book-icon-book-icon-simple-sign-book-icon-isolated-on-with-background-illustration-of-book-icon-free-free-vector.jpg"
              }
              alt=""
            />
          </div>
        </label>
        {/* buttons */}
        <div className="mt-7 flex items-center gap-x-3">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded-sm cursor-pointer transition-colors ease-in-out duration-150 hover:bg-green-600"
            onClick={addNewBookSubmitHandler}
          >
            Publish
          </button>
          <button
            className="px-3 py-1 bg-neutral-500 text-white rounded-sm cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-600"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
