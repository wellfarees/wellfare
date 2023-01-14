import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useEffect } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleModal } from "../../redux/actions/modalSlice";
import DetailedRecord from "../Records/DetailedRecord";
import AccountSuspended from "../AccountSuspended/AccountSuspended";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  display: none;
  justify-content: center;
  z-index: 10000;
`;

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
`;

const ModalWindow = styled.div`
  padding: 5em;
  background-color: ${(props) => props.theme.backgroundColor} !important;
  position: relative;
  z-index: 100000000000;
  width: 450px;

  .close-modal {
    position: absolute;
    right: 1em;
    top: 1em;
    padding: 0.5em;
    cursor: pointer;
    transition: 0.3s;
    font-size: 1.6em;

    &:hover {
      color: ${(props) => props.theme.shadedColor};
    }
  }
`;

const Modal: React.FC<{ state: boolean }> = ({ children, state }) => {
  const size = useScreenSize();
  const dispatch = useAppDispatch();
  const modalInfo = useAppSelector((state) => state.modal);

  const [backdropStyles, backdropApi] = useSpring(() => {
    return {
      from: { display: "none", opacity: 0 },
    };
  });
  const [modalStyles, modalApi] = useSpring(() => {
    return {
      from: { opacity: 0, scale: 0.95 },
    };
  });

  const [wrapperStyles, wrapperApi] = useSpring(() => {
    return {
      from: { display: "none" },
    };
  });

  const openModal = (): void => {
    wrapperApi.start({
      to: { display: "flex" },
    });
    backdropApi.start({
      to: async (animate) => {
        await animate({
          to: {
            display: "flex",
          },
        });
        await animate({
          to: {
            opacity: 1,
          },
        });
      },
    });

    modalApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 1, scale: 1 },
        });
      },
    });
  };

  const closeModal = (): void => {
    modalApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0, scale: 0.95 },
        });
      },
    });
    backdropApi.start({
      to: async (animate) => {
        await animate({
          to: {
            opacity: 0,
          },
        });
        await animate({
          to: {
            display: "none",
          },
        });
        wrapperApi.start({
          to: { display: "none" },
        });
      },
    });
  };

  useEffect(() => {
    if (state) openModal();
    else closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (size! < 425 || (size! <= 812 && window.innerHeight <= 425)) {
      closeModal();
      dispatch(toggleModal({ open: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  let ModalContents: JSX.Element;

  switch (modalInfo.type) {
    case "record":
      ModalContents = <DetailedRecord data={modalInfo.record.content} />;
      break;
    case "accountSuspended":
      ModalContents = <AccountSuspended email={modalInfo.suspended.email} />;
      break;
  }

  return (
    <Wrapper as={animated.div} style={wrapperStyles}>
      <Backdrop
        as={animated.div}
        style={backdropStyles}
        onClick={() => {
          dispatch(toggleModal({ open: false }));
        }}
      ></Backdrop>
      <ModalWindow
        as={animated.div}
        style={modalStyles}
        className="modal-window"
      >
        <span
          className="close-modal"
          onClick={() => {
            dispatch(toggleModal({ open: false }));
          }}
        >
          &times;
        </span>
        <div className="modal-content">{ModalContents}</div>
      </ModalWindow>
    </Wrapper>
  );
};

export default Modal;
