import { useState, useEffect } from "react";

export const useScreenSize = (): null | number => {
  const [size, setSize] = useState<null | number>(null);
  // const initialSize =

  useEffect(() => {
    const updateSize = (e: UIEvent) => {
      setSize(document.body.offsetWidth);
    };
    setSize(document.body.offsetWidth);

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return size;
};
