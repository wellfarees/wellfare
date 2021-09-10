import { useSpring, animated, config } from "react-spring";
import styled from "styled-components";

interface useLoadingIndicatorReturns {
  Spinner: JSX.Element;
  startSpinner: () => void;
  stopSpinner: () => void;
}

const useLoadingIndicator = (): useLoadingIndicatorReturns => {
  const SpinnerSpan = styled.span`
    width: 15px;
    height: 15px;
    border-radius: 100%;
    display: inline-block;
    border: 3px solid #fff;
    border-bottom: 3px solid #0bf5f56a;
    margin-right: 0.7em;
  `;

  const [indicatorStyles, indicatorApi] = useSpring(() => {
    return {
      from: {
        display: "none",
        opacity: 0,
        rotateZ: 0,
      },
    };
  });

  const Spinner = (
    <SpinnerSpan
      as={animated.span}
      style={indicatorStyles}
      className="loading-indicator"
    ></SpinnerSpan>
  );

  const startSpinner = (): void => {
    indicatorApi.start({
      to: async (animate) => {
        await animate({
          to: { display: "inline-block" },
        });
        await animate({
          to: { opacity: 1 },
        });
        await animate({
          to: { rotateZ: 360 },
          loop: true,
          delay: 0,
          config: config.molasses,
        });
      },
    });
  };

  const stopSpinner = (): void => {
    indicatorApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0 },
        });
        await animate({
          to: { display: "none" },
        });
        await animate({
          to: { rotateZ: 0 },
          loop: false,
          delay: 0,
        });
      },
    });
  };

  return { Spinner, startSpinner, stopSpinner };
};

export { useLoadingIndicator };
