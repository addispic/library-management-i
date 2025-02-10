// icons
import { FaCamera } from "react-icons/fa";
// components
import AddNewBook from "./AddNewBook";
export default function RightSideBar() {
  return (
    <div className="w-96 shrink-0 h-full">
      <div className="px-5 py-1.5 h-full w-full">
        <div className="h-full w-full bg-white shadow-2xl rounded-md overflow-hidden flex flex-col">
          {/* bg image */}
          <div className="w-full h-[120px] overflow-hidden relative">
            {/* image picker */}
            <input type="file" accept="image/*" hidden id="bg-image-picker" />
            <label
              htmlFor="bg-image-picker"
              className="absolute right-3 top-3 cursor-pointer"
            >
              <div className="w-[24px] aspect-square shrink-0 flex items-center justify-center bg-white/50 rounded-full text-sm">
                <FaCamera />
              </div>
            </label>
            <img
              className="w-full h-full object-center object-cover"
              src="https://tse2.mm.bing.net/th?id=OIP.dTvwVC62CFZnk3zNVCArlwHaEK&pid=Api&P=0&h=220"
              alt=""
            />
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
              />
              <label
                htmlFor="profile-image-picker"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer"
              >
                <div className="w-[24px] aspect-square shrink-0 flex items-center justify-center bg-white/80 rounded-full text-sm">
                  <FaCamera />
                </div>
              </label>
              <img
                className="w-full h-full object-center object-cover"
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"
                alt=""
              />
            </div>
          </div>
          {/* publish new book */}
          <AddNewBook />
        </div>
      </div>
    </div>
  );
}
