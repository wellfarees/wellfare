import { useSpring, animated, config } from "react-spring";
import styled from "styled-components";

interface useLoadingIndicatorReturns {
  Spinner: JSX.Element;
  spinnerApi: {
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
  };
}
const SpinnerSpan = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  display: inline-block;
  border: 3px solid #fff;
  border-bottom: 3px solid #0bf5f56a;
  margin-right: 0.7em;
`;

const useLoadingIndicator = (): useLoadingIndicatorReturns => {
  class ApiCreator {
    constructor() {}

    start(): void {
      indicatorApi.start({
        to: async (animate) => {
          await animate({
            to: { opacity: 1 },
          });
          await animate({
            to: { rotateZ: 720 },
            loop: true,
            delay: 0,
            config: config.molasses,
          });
        },
      });
    }

    stop(): void {
      indicatorApi.start({
        to: async (animate) => {
          await animate({
            to: { opacity: 0 },
          });
        },
      });
    }

    pause(): void {
      indicatorApi.pause();
    }

    resume(): void {
      indicatorApi.resume();
    }
  }

  const [indicatorStyles, indicatorApi] = useSpring(() => {
    return {
      from: {
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

  return { Spinner, spinnerApi: new ApiCreator() };
};

export { useLoadingIndicator };
