import { SpringValue } from "@react-spring/core";
import { useSpring, config } from "react-spring";

interface OverlaySpringProps {
  display: SpringValue<string>;
  opacity: SpringValue<number>;
}

interface NavSpringProps {
  right: SpringValue<string>;
}

const useNavToggler = (
  state: boolean
): [OverlaySpringProps, NavSpringProps] => {
  const [navStyles, navSpringApi] = useSpring(() => {
    return {
      from: { right: "-100%" },
      config: config.default,
    };
  });

  const [overlayStyles, overlaySpringApi] = useSpring(() => {
    return {
      from: { opacity: 0, display: "none" },
    };
  });

  if (state) {
    overlaySpringApi.start({
      to: async (animate) => {
        await animate({
          to: { display: "flex" },
        });
        await animate({
          to: { opacity: 1 },
        });
      },
    });
  } else {
    overlaySpringApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0 },
        });
        await animate({
          to: { display: "none" },
        });
      },
    });
  }

  navSpringApi.start({
    to: { right: state ? "0%" : "-100%" },
  });

  return [overlayStyles, navStyles];
};

export default useNavToggler;
