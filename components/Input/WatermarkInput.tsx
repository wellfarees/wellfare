import { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import { fontSizes } from "../../config/userConfig";
import { animated, useSpring } from "react-spring";

const TextAreaContainer = styled.div`
  position: relative;
  padding-top: 20px;

  label {
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    font-size: 1.3rem;
    opacity: 0;
  }
`;

const TextArea = styled.textarea<{ main: boolean }>`
  background: transparent;
  color: ${(props) => props.theme.mainColor};
  border: none;
  outline: none;
  font-weight: ${(props: any) => (props.main ? "800" : "400")};
  overflow: hidden;
  resize: none;
  font-family: "Inter";
  margin-top: ${(props: any) => (props.main ? 0 : "-20px")};
  padding-top: ${(props: any) => (props.main ? 0 : "20px")};
  font-size: ${(props: any) =>
    props.main ? fontSizes.h1 + "px" : fontSizes.base + "px"};
  line-height: 1.2;

  &::placeholder {
    font-family: "Inter";
    color: ${(props) => props.theme.watermark};
  }
`;

interface InputProps {
  setAreaRef?: Function;
  placeholder: string;
  type?: string;
  main: boolean;
  label: string;
  toFocus?: boolean;
}

const WatermarkInput: React.FC<InputProps> = ({
  type,
  setAreaRef,
  placeholder,
  main,
  label,
  toFocus,
}) => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const [labelStyles, labelApi] = useSpring(() => {
    return {
      from: {
        display: "none",
        opacity: 0,
        y: 6,
      },
    };
  });

  if (toFocus) {
    useEffect(() => {
      areaRef.current?.focus();
    }, []);
  }

  useEffect(() => {
    const OnInput = () => {
      if (areaRef !== null && areaRef.current !== null) {
        areaRef.current.style.height = main ? "1em" : "auto";
        areaRef.current.style.height = areaRef.current.scrollHeight + "px";
      }
    };

    setAreaRef && setAreaRef(areaRef!);

    areaRef!.current?.setAttribute(
      "style",
      "height:" + areaRef!.current.scrollHeight + "px;overflow-y:hidden;"
    );

    if (areaRef !== null && areaRef.current !== null)
      areaRef.current.addEventListener("input", OnInput, false);

    return () => {
      if (areaRef !== null && areaRef.current !== null)
        areaRef!.current.removeEventListener("input", OnInput, false);
    };
  }, []);

  return (
    <TextAreaContainer>
      <animated.label style={labelStyles} htmlFor={type}>
        {label}
      </animated.label>
      <TextArea
        id={type}
        name={type}
        placeholder={placeholder}
        ref={areaRef}
        main={main}
        onChange={(e) => {
          const { value } = e.target;

          if (value.length) {
            labelApi.start({
              to: async (animate) => {
                await animate({
                  to: {
                    display: "block",
                  },
                });

                await animate({
                  to: {
                    opacity: 1,
                    y: 0,
                  },
                });
              },
            });
            return;
          }

          labelApi.start({
            to: async (animate) => {
              await animate({
                to: {
                  opacity: 0,
                  y: 6,
                },
              });

              await animate({
                to: {
                  display: "none",
                },
              });
            },
          });
          return;
        }}
      ></TextArea>
    </TextAreaContainer>
  );
};

export default WatermarkInput;
