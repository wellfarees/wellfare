import { useState, useEffect } from "react";

const useOnMobile = (
  cb1: Function,
  args1: any,
  cb2: Function,
  args2: any
): void => {
  useEffect(() => {
    if (
      document.body.offsetWidth <= 420 ||
      (document.body.offsetWidth <= 812 && document.body.offsetHeight <= 420)
    ) {
      cb1(...args1);
    } else {
      cb2(...args2);
    }

    const listener = () => {
      if (
        document.body.offsetWidth <= 420 ||
        (document.body.offsetWidth <= 812 && document.body.offsetHeight <= 420)
      ) {
        cb1(...args1);
      } else {
        cb2(...args2);
      }
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
};

export { useOnMobile };
