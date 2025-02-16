// left side bar toggler
export const leftSideBarTogglerHandler = () => {
  const leftSideBar = document.getElementById("left-side-bar");
  if (leftSideBar?.classList.contains("absolute")) {
    if (leftSideBar.classList.contains("w-0")) {
      leftSideBar.classList.remove("w-0");
      leftSideBar.classList.add("w-[100vw]");
    } else {
      leftSideBar.classList.remove("w-[100vw]");
      leftSideBar.classList.add("w-0");
    }
  }
};

// right side bar toggler
export const rightSideBarToggler = () => {
  const rightSideBar = document.getElementById("right-side-bar");
  if (rightSideBar?.classList.contains("absolute")) {
    if (rightSideBar.classList.contains("w-0")) {
      rightSideBar.classList.remove("w-0");
      rightSideBar.classList.add("w-[100vw]");
    } else {
      rightSideBar.classList.remove("w-[100vw]");
      rightSideBar.classList.add("w-0");
    }
  }
};
