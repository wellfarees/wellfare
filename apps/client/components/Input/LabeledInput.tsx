import React, { MutableRefObject, useRef, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";

interface InputProps {
  type?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  setInputRef?: Function;
  defaultValue?: string | number;
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
      transition: 0.6s background;
      max-width: 300px;

      &::placeholder {
        color: #bfbfbf;
      }
    }
  }

  @media only screen and (max-width: 425px) {
    label {
      position: static !important;
      font-size: 1.4rem !important;
      opacity: 1 !important;
      display: inline-block !important;
      margin-bottom: 0.3em;
      transform: none !important;
    }

    input {
      &::placeholder {
        color: transparent !important;
      }

      padding-top: 1em !important;
      padding-bottom: 1em !important;
      margin-top: 0.7em;
      width: 100%;
    }
  }
`;

const LabeledInput: React.FC<InputProps> = ({
  type,
  inputRef,
  setInputRef,
  defaultValue,
}) => {
  const label = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    const setter = setInputRef!;
    setter(inputRef);
  }, [inputRef, setInputRef]);

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

  useEffect(() => {
    if (!defaultValue) return;

    showLabel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <Wrapper>
      <div className="input-block">
        <animated.label style={labelStyles} ref={label} htmlFor={type}>
          Your {type}
        </animated.label>
        <input
          ref={inputRef}
          onChange={handleLabel}
          type={type?.toLowerCase().includes("password") ? "password" : type}
          name={type}
          id={type}
          placeholder={`Your ${type}`}
          defaultValue={defaultValue || ""}
        />
      </div>
    </Wrapper>
  );
};

export default LabeledInput;
