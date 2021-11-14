import styled from "styled-components";
import { GlowingBLue } from "../../styled/reusable";
import { useLoadingIndicator } from "../../hooks/useLoadingIndicator";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  transition: 0.3s all;
  .inner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.3s all;

    .loader-container,
    .content {
      transition: 0.4s all;
    }

    .loading-indicator {
      position: absolute;
      top: 0.05em;
      left: -0.8em;
    }
  }

  .loading {
    .content {
      transform: translateX(1em);
    }
  }

  .loading-wrapper button {
    cursor: not-allowed !important;

    .inner-content {
      pointer-events: none !important;
    }
  }

  .default-btn-styles {
    ${GlowingBLue}
    transition: 0.3s all;
  }

  .loading-btn {
    box-shadow: 0px 0px 7px 1px rgba(67, 91, 176, 0.6);
    background: #2c6ca8;
  }
`;

interface ButtonProps {
  withLoading?: {
    toBeLoading: boolean;
    toModifyOnStateChange?: {
      word: string;
      endingToReplace: string;
      keepEnding?: boolean;
    };
  };
  customClassName?: string;
  blockOnce?: boolean;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  withLoading,
  customClassName,
  blockOnce,
  ...props
}) => {
  const { Spinner, spinnerApi } = useLoadingIndicator();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentsValues = useRef<string[]>([]);
  const hasBeenBlocked = useRef(false);

  useEffect(() => {
    if (withLoading) {
      const { toModifyOnStateChange, toBeLoading } = withLoading;

      if (!wrapperRef.current) return;

      const button =
        wrapperRef.current.querySelector<HTMLElement>("button .content")!;
      const parent =
        wrapperRef.current.closest<HTMLElement>(".loader-wrapper")!;
      const buttonElement = parent.querySelector<HTMLButtonElement>("button")!;

      contentsValues.current.push(button.innerHTML);

      if (toBeLoading) {
        if (toModifyOnStateChange) {
          const { word, endingToReplace, keepEnding } = toModifyOnStateChange;
          const modifiedWord = keepEnding
            ? word + "ing"
            : word.replace(endingToReplace, "ing");
          button.innerHTML = contentsValues.current[0].replace(
            word,
            modifiedWord
          );
        }

        wrapperRef.current.classList.add("loading");

        buttonElement.classList.add("loading-btn");

        buttonElement.style.pointerEvents = "none";
        parent.style.cursor = "not-allowed";

        spinnerApi.start();
      } else {
        if (toModifyOnStateChange) {
          button.innerHTML = contentsValues.current[0];
        }
        wrapperRef.current.classList.remove("loading");
        wrapperRef.current
          .closest(".loader-wrapper")
          ?.classList.remove("loading-wrapper");
        buttonElement.classList.remove("loading-btn");

        if (!hasBeenBlocked.current) {
          buttonElement.style.pointerEvents = "inherit";
          parent.style.cursor = "pointer";

          if (blockOnce) {
            hasBeenBlocked.current = true;
          }
        }
        spinnerApi.stop();
      }
    }
  }, [withLoading?.toBeLoading]);

  return (
    <Wrapper className="loader-wrapper" {...props}>
      <button className={customClassName || "default-btn-styles"}>
        <div ref={wrapperRef} className="inner-content">
          {withLoading && <div className="loader-container">{Spinner}</div>}
          <span className="content">{children}</span>
        </div>
      </button>
    </Wrapper>
  );
};

export default Button;
