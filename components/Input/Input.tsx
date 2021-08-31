import React, { MutableRefObject, useRef, useState } from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";

interface InputProps {
  type?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
}

const Wrapper = styled.div`
  .input-block {
    position: relative;

    label {
      position: absolute;
      left: 1.5em;
      top: -0.5em;
      font-size: 1.1rem;
      opacity: 0;
      display: none;
      color: #636363;
    }

    input {
      background: #ffffff;
      padding: 0.7em 1.3em;
      border-radius: 4px;
      outline: none;
      border: none;
      font-size: 1.5rem;

      &::placeholder {
        color: #bfbfbf;
      }
    }
  }
`;

const Input: React.FC<InputProps> = ({ type, inputRef }) => {
  const [value, setValue] = useState();
  const label = useRef<HTMLLabelElement | null>(null);

  const [labelStyles, api] = useSpring(() => {
    return {
      from: {
        display: "none",
        opacity: 0,
        y: 12,
      },
      config: config.stiff,
    };
  });

  const showLabel = (): void => {
    api.start({
      to: async (animate) => {
        await animate({
          to: { display: "block" },
        });

        await animate({
          to: { opacity: 1, y: 0 },
        });
      },
    });
  };

  const hideLabel = (): void => {
    api.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0, y: 12 },
        });
        await animate({
          to: { display: "none" },
        });
      },
    });
  };

  const handleLabel = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let val = e.target.value;
    if (val.length) {
      showLabel();
    } else {
      hideLabel();
    }
  };

  return (
    <Wrapper>
      <div className="input-block">
        <animated.label style={labelStyles} ref={label} htmlFor={type}>
          Your {type}
        </animated.label>
        <input
          ref={inputRef}
          onChange={handleLabel}
          type={type}
          name={type}
          id={type}
          placeholder={`Your ${type}`}
        />
      </div>
    </Wrapper>
  );
};

export default Input;
