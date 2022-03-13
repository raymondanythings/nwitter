import { useEffect, useState } from "react";

function useTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const titleDom = document.querySelector("title");
    if (titleDom) {
      titleDom.innerText = `Nwitter | ${title}`;
    }
  };
  useEffect(updateTitle, [title]);
  return setTitle;
}

export default useTitle;
