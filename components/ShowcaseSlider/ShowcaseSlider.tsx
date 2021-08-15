import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Slider = styled.div`
  position: relative;
  img {
    border-radius: 20px;
  }

  img:not(.main-img) {
    position: absolute;
    top: 0;
    width: 400px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.5s;
    transform-origin: center;

    &:hover {
      box-shadow: -5px 4px 23px rgba(0, 0, 0, 0.07);
      width: 420px;
    }
  }

  .main-img {
    box-shadow: -5px 4px 23px rgba(15, 15, 15, 0.1);
    position: relative;
    z-index: 10000;
    width: 500px;
    transition: 0.5s;
    transform-origin: center;
  }

  img:first-of-type {
    left: 0;
  }

  img:last-of-type {
    right: 0;
  }
`;

const ShowcaseSlider: React.FC = () => {
  return (
    <div className="slider">
      <Slider>
        <img src="./img/UI/ui_settings.png" alt="Main UI" />
        <img className="main-img" src="./img/UI/main_ui.png" alt="Main UI" />
        <img src="./img/UI/weekly_recap.png" alt="Main UI" />
      </Slider>
    </div>
  );
};

export default ShowcaseSlider;
