import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { TouchEvent } from "react";

const Wrapper = styled.div`
  position: relative;

  .inner-container {
    position: absolute;
    display: flex;
    gap: 2em;
    left: -25px;

    & > div {
      width: 300px;
    }
  }
`;

const Scroller: React.FC = ({ children }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const lastPosition = useRef(0);
  const prevOffset = useRef(0);

  const [styles, api] = useSpring(() => {
    return {
      from: { left: -25 },
      config: config.wobbly,
    };
  });

  useEffect(() => {
    if (container.current) {
      const h =
        container.current.querySelector<HTMLElement>(".inner-container")
          ?.offsetHeight!;
      container.current.style.height = h + "px";
      setContainerWidth(
        container.current.querySelector<HTMLElement>(".inner-container")
          ?.offsetWidth as number
      );
    }
  }, []);

  // Variables for velocity
  let touchStart = 0;
  let startTime = 0;
  let endTime = 0;
  let touchEnd = 0;

  const startDragging = (e: TouchEvent<HTMLDivElement>): void => {
    endTime = performance.now();

    const deltaX = touchStart - e.touches[0].clientX;

    let displacement = touchEnd + deltaX;

    if (displacement < 25) {
      displacement = 25;
    }

    if (displacement > containerWidth / 1.45) {
      displacement = containerWidth / 1.45;
    }

    prevOffset.current = displacement;

    api.start({
      left: -displacement,
    });

    // TODO: Add velocity into account when calculating offset by which to move the scroller container

    const velocity = Math.round(
      Math.abs(deltaX / ((endTime - startTime) / 100))
    ); // pixels per second (px/s)
  };

  const stopDragging = (e: TouchEvent<HTMLDivElement>): void => {
    window.removeEventListener("touchmove", startDragging as any);
    touchEnd = prevOffset.current;
  };

  const initDrag = (e: TouchEvent<HTMLDivElement>): void => {
    let deltaX = window.innerWidth - e.touches[0].clientX;
    touchStart = window.innerWidth - deltaX;

    startTime = performance.now();
    window.addEventListener("touchmove", startDragging as any);
    window.addEventListener("touchend", stopDragging as any);
  };

  return (
    <Wrapper ref={container} onTouchStart={initDrag} className="scroller">
      <animated.div style={styles} className="inner-container">
        {children}
      </animated.div>
    </Wrapper>
  );
};

export default Scroller;
