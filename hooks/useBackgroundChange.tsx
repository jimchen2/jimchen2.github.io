import { useState, useEffect, useRef } from "react";

function useBackgroundChange() {
  const [background1, setBackground1] = useState("");
  const [background2, setBackground2] = useState("");
  const activeIndex = useRef(1); // Use ref instead of state for activeIndex
  const cycleCount = useRef(0);

  useEffect(() => {
    const loadNewImage = async () => {
      const randomId = Math.floor(Math.random() * 1000);
      const url = `https://picsum.photos/1600/900?random=${randomId}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
    };

    const fetchInitialImage = async () => {
      const initImage = await loadNewImage();
      setBackground1(initImage);
    };

    fetchInitialImage();

    const interval = setInterval(async () => {
      cycleCount.current += 1;
      if (cycleCount.current % 2 === 1) {
        const newImage = await loadNewImage();
        if (activeIndex.current === 1) {
          setBackground2(newImage);
        } else {
          setBackground1(newImage);
        }
      } else {
        activeIndex.current = 3 - activeIndex.current;
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      URL.revokeObjectURL(background1);
      URL.revokeObjectURL(background2);
    };
  }, []); // Removed activeIndex from dependencies

  return {
    background1, 
    background2, 
    activeIndex: activeIndex.current
  };
}

export default useBackgroundChange;
