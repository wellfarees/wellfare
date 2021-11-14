import React, { useEffect, useRef, memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useScreenSize } from "../../hooks/useScreenSize";

import showcaseImage1 from "../../public/img/ui_settings.png";
import showcaseImage2 from "../../public/img/main_ui.png";
import showcaseImage3 from "../../public/img/weekly_recap.png";

const Slider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 500px;

  img {
    border-radius: 20px;
  }

  .img-block {
    position: absolute;
    top: 5em;
    bottom: 0;
    width: 537px;
    height: 380px;
    border-radius: 20px;
    transition: all 0.5s ease 0s;
    cursor: pointer;
  }

  @media only screen and (min-width: 1024px) {
    .img-block:not(.main-img) {
      &:hover {
        box-shadow: rgb(0 0 0 / 7%) -5px 4px 23px;
        transform: scale(1.1);
      }
    }
  }

  .img-1 {
    left: 0;
  }

  .img-3 {
    right: 0;
  }

  .main-img {
    position: absolute !important;
    left: 0;
    right: 0;
    margin: 0 auto;
    box-shadow: -5px 4px 23px rgba(15, 15, 15, 0.1);
    z-index: 10000;
    transition: 0.5s;
    transform-origin: center;
    transform: scale(1.2);
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    height: auto !important;
    gap: 2em;

    .img-block {
      width: 100% !important;
      border-radius: 5%;
      margin-top: 4em;
      position: static !important;
      max-width: 700px !important;

      &:first-of-type {
        margin-top: -2em;
      }
    }

    .main-img {
      transform: scale(1);
    }

    .img-block:not(.main-img) {
      transform: translateY(0);
    }
  }
`;

// TODO: Take screenshots with images for showcase and ensure they all are the SAME resolution
// NOTE: Maybe make this a public npm package???
const withAdaptiveContainer =
  (className: string, resolutionRatio: number) =>
  (ImageComponent: typeof Image): React.FC<any> => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const screenSize = useScreenSize();
    const ComposedComponent: React.FC = (props: any) => {
      useEffect(() => {
        if (!containerRef.current) return;
        if ((screenSize as number) > 1024) {
          containerRef.current.style.height = "380px";
          return;
        }
        const currentContainerWidth = containerRef.current.offsetWidth;
        // set the appropriate height
        containerRef.current.style.height =
          currentContainerWidth * resolutionRatio + "px";
      }, []);

      const ImageComp = memo(ImageComponent);

      return (
        <div ref={containerRef} className={className}>
          <ImageComp {...props} />
        </div>
      );
    };

    return ComposedComponent;
  };

const ShowcaseSlider: React.FC = () => {
  const Image1 = withAdaptiveContainer("img-block img-1", 0.7)(Image);
  const Image2 = withAdaptiveContainer("main-img img-block ", 0.7)(Image);
  const Image3 = withAdaptiveContainer("img-block img-3", 0.7)(Image);

  return (
    <div className="slider">
      <Slider>
        <Image1 src={showcaseImage1} />
        <Image2 src={showcaseImage2} />
        <Image3 src={showcaseImage3} />
      </Slider>
    </div>
  );
};

export default ShowcaseSlider;
