import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";

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
  const [styles, api] = useSpring(() => {
    return {
      from: { left: -25 },
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

  const bind = useDrag(
    (e) => {
      if (e.distance[0] === 0) return;

      api.start({
        left: 25 + e.offset[0] * 2,
      });
    },
    {
      threshold: 10,
      bounds: {
        right: -25,
        left: -(containerWidth - document.body.offsetWidth / 1.4) / 2,
      },
    }
  );

  return (
    <Wrapper ref={container} {...bind()} className="scroller">
      <animated.div style={styles} className="inner-container">
        {children}
      </animated.div>
    </Wrapper>
  );
};

export default Scroller;
