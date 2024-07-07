import { useState, useEffect, useRef } from "react";

function useBackgroundChange() {
  const [background1, setBackground1] = useState("");
  const [background2, setBackground2] = useState("");
  const activeIndex = useRef(1);
  const cycleCount = useRef(0);

  useEffect(() => {
    const loadNewImage = async () => {
      try {
        const randomId = Math.floor(Math.random() * 1000);
        const url = `https://picsum.photos/1600/900?random=${randomId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        return objectURL;
      } catch (error) {
        console.error("Error loading image:", error);
        return null;
      }
    };

    const fetchInitialImage = async () => {
      const initImage = await loadNewImage();
      if (initImage) {
        setBackground1(initImage);
      }
    };

    fetchInitialImage();

    const interval = setInterval(async () => {
      cycleCount.current += 1;
      if (cycleCount.current % 2 === 1) {
        const newImage = await loadNewImage();
        if (newImage) {
          if (activeIndex.current === 1) {
            setBackground2(newImage);
          } else {
            setBackground1(newImage);
          }
        }
      } else {
        activeIndex.current = 3 - activeIndex.current;
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (background1) URL.revokeObjectURL(background1);
      if (background2) URL.revokeObjectURL(background2);
    };
  }, []);

  return {
    background1, 
    background2, 
    activeIndex: activeIndex.current
  };
}

export default useBackgroundChange;