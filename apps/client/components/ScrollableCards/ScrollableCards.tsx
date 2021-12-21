import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useSpring, animated } from "react-spring";

const ScrollerContainer = styled.div`
  max-width: 99vw;
  display: flex;
  margin-left: 5.4em;

  & > * {
    flex-shrink: 0;
    margin-right: 3em;
  }
`;

interface ScrollableCardsProps {
  changeInterval: number;
}

const ScrollableCards: React.FC<ScrollableCardsProps> = ({
  changeInterval,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const previousWidth = useRef<number>(0);
  const [scrollBy, setScrollBy] = useState(0);
  const [scrollerStyles, scrollerAPI] = useSpring(() => ({
    from: { x: "0px" },
  }));

  useEffect(() => {
    let currentIndex = 1;

    let interval = setInterval(() => {
      if (container.current) {
        previousWidth.current =
          currentIndex > 0 ? 276 * currentIndex + currentIndex : 0;

        setScrollBy(previousWidth.current);

        currentIndex =
          currentIndex < container.current?.children.length - 1
            ? ++currentIndex
            : 0;
      }
    }, changeInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    scrollerAPI.start({ x: -scrollBy + "px" });

    return () => {
      scrollerAPI.stop();
    };
  }, [scrollBy]);
  return (
    <div className="scrollable-container">
      <ScrollerContainer
        ref={container}
        as={animated.div}
        style={scrollerStyles}
      >
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
        <Card
          title="Journal your feelings"
          description="How you feelings? is eveything ok? Well. it’s time to journal that"
        />
      </ScrollerContainer>
    </div>
  );
};

export default ScrollableCards;
