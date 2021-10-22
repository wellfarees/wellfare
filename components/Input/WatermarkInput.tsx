import { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import { fontSizes } from "../../config/userConfig";
import { animated, useSpring } from "react-spring";

const TextAreaContainer = styled.div`
  position: relative;
  padding-top: 20px;
  transition: 0.3s;

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
  width: 100%;
  line-height: 1.5;

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
  isLocked?: boolean;
  defaultValue?: string;
}

const WatermarkInput: React.FC<InputProps> = ({
  type,
  setAreaRef,
  placeholder,
  main,
  label,
  toFocus,
  defaultValue,
  isLocked = false,
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

  useEffect(() => {
    if (toFocus) {
      areaRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const OnInput = () => {
      if (areaRef !== null && areaRef.current !== null) {
        areaRef.current.style.height = main ? "1em" : "auto";
        areaRef.current.style.height = areaRef.current.scrollHeight + "px";

        const mainWrapper = areaRef.current.closest("div")!;
        mainWrapper.classList.add("active-textarea");
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

  useEffect(() => {
    if (!isLocked && areaRef.current) {
      areaRef.current.selectionStart = areaRef.current.selectionEnd =
        areaRef.current.value.length;
      areaRef.current?.focus();
    }
  }, [isLocked]);

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
        defaultValue={defaultValue}
        readOnly={isLocked}
        onChange={(e) => {
          const areaNonNull = areaRef.current!;
          if (defaultValue) return;
          const { value } = e.target;

          if (!isLocked) {
            areaNonNull.closest("div")?.classList.remove("active-textarea");

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
          }

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

          if (areaNonNull.closest("div")) {
            areaNonNull.closest("div")?.classList.remove("active-textarea");
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
