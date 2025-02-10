// icons
import { FiSearch } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
export default function Home() {
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
      <div className="flex-1 pr-1.5 max-h-[84vh] overflow-y-auto">
        <div className="grid grid-cols-3 gap-7">
          {[...Array(130)].map((item, index) => {
            return (
              <div key={index}>
                {/* the book */}
                <div className="relative">
                  {/* image */}
                  <div className="w-full overflow-x-hidden rounded-t-xl h-[250px]">
                    <img
                      className="w-full h-full object-center object-cover"
                      src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1590965645i/53713557.jpg"
                      alt=""
                    />
                  </div>
                  {/* book author & title */}
                  <div className="absolute left-0 w-full bottom-0 bg-white/75 p-3 rounded-t-xl overflow-hidden">
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-[24px] font-medium aspect-square rounded-full bg-white shadow-md flex items-center justify-center text-xs">
                      <span>3</span>
                    </div>
                    <h3>ፍቅር እስከ መቃብር</h3>
                    <p className="text-sm">
                      By <span className="font-medium">Haddis Alemayehu</span>
                    </p>
                  </div>
                </div>
                {/* footer */}
                <footer className="w-full p-1.5 bg-white">
                  {/* actions */}
                  <div className="flex items-center justify-between gap-x-1.5 my-1.5">
                    {/* like */}
                    <button className="flex items-center gap-x-1 text-sm cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                      <span>12</span>
                      <AiOutlineLike className="text-2xl" />
                    </button>
                    {/* comment */}
                    <button className="flex items-center gap-x-1 text-sm cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                      <span>24</span>
                      <FaRegMessage className="text-lg" />
                    </button>

                    {/* borrow */}
                    <button className="flex items-center gap-x-1 text-sm cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                      <IoCartOutline className="text-2xl" />
                      <span>borrow</span>
                    </button>
                    {/* favorite */}
                    <button className="flex items-center gap-x-1 text-sm cursor-pointer text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500">
                      <MdFavoriteBorder className="text-2xl" />
                    </button>
                  </div>
                  {/* author */}
                  <div>
                    <div className="flex items-center gap-x-1.5 text-sm text-neutral-500">
                      <div className="w-[28px] aspect-square rounded-full overflow-hidden shrink">
                        <img
                          className="w-full h-full object-center object-cover"
                          src="https://c.pxhere.com/photos/c7/42/young_man_portrait_beard_young_man_male_handsome_young_man_handsome-1046502.jpg!d"
                          alt=""
                        />
                      </div>
                      <div>
                        <p>Addis Fenta</p>
                        <p className="flex items-center gap-x-1.5 text-xs text-green-500">
                          <CiClock2 />
                          <span>3 minutes ago</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
