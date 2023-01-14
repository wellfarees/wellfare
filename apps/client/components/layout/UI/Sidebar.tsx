import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import { useEffect, useRef, MutableRefObject } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { themes } from "../../../styled/themes";
import { useActions } from "../../../hooks/useActions";
import { toggleSidebar } from "../../../redux/actions/unitStatesSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logout } from "../../../redux/actions/userSlice";

const Wrapper = styled.div`
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    z-index: 20;
    display: none;
    opacity: 0;
  }

  @media only screen and (min-width: 768px) {
    .overlay {
      display: none;
    }
  }
`;

const SidebarEl = styled.aside`
  width: 400px;
  background: ${(props: any) => props.theme.sidebar};
  color: ${(props: any) => props.theme.mainColor};
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  padding: 4em;

  span {
    padding: 1.2em 2em;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    transition: 0.3s all;
    border-radius: 13px;

    &:hover {
      background: ${(props: any) => props.theme.maximum} !important;
    }

    i {
      margin-right: 0.7em;
    }
  }

  li {
    margin-top: 1.5em;
  }

  .signOut span:hover {
    background-color: ${(props: any) => props.theme.error} !important;
    color: white;
  }

  @media only screen and (max-width: 1023px) {
    width: 80%;
    padding: 0;

    li {
      margin-top: 0;
      border-radius: 0px !important;
    }

    span {
      padding: 1.7em 2em;
      border-radius: 0px !important;
    }
  }

  @media only screen and (min-width: 1024px) {
    left: 0 !important;
  }
`;

const NavPoint: React.FC<{ active?: boolean; endPoint?: string }> = ({
  active,
  children,
  endPoint,
}) => {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const router = useRouter();
  const { user } = useTypedSelector((state) => state);
  const userInfo = user.info!;

  const retrieveTextFromSpan = (span: HTMLSpanElement): string => {
    let children = span.childNodes[1]!;
    return children.textContent?.trim()!;
  };

  const retrievePointText = (
    target: MutableRefObject<HTMLLIElement | null>
  ): string => {
    if (!target.current) return "";
    let span = target.current.querySelector<HTMLElement>("span")!;
    return retrieveTextFromSpan(span);
  };

  const disableCurrentPoints = (
    parent: HTMLUListElement,
    activePoint: string | null
  ): void => {
    let nodes = parent.querySelectorAll("span")!;

    nodes.forEach((node) => {
      if (retrieveTextFromSpan(node) === activePoint) return;
      node.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });
  };

  const indicatePointWithCss = (point: string | null): void => {
    if (!itemRef.current) return;

    if (!point || point === "null") {
      itemRef.current.querySelectorAll("span").forEach((el) => {
        el.style.backgroundColor = "rgba(0, 0, 0, 0)";
      });
      return;
    }

    disableCurrentPoints(itemRef.current.closest("ul")!, point);
    let span = itemRef.current.querySelector<HTMLElement>("span")!;
    const pointText = retrievePointText(itemRef);

    if (pointText === point) {
      span.style.backgroundColor = themes[userInfo.config.theme].maximum;
    }
  };

  const getLastPathPiece = (thePath: string): string =>
    thePath.substring(thePath.lastIndexOf("/") + 1);

  useEffect(() => {
    if (!itemRef.current) return;

    if (!endPoint) return;

    // Reset all point indications in case page in not available through the sidebar
    itemRef.current.querySelectorAll("span").forEach((el) => {
      el.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });

    // indicate the sidebar point
    if (getLastPathPiece(router.pathname) === endPoint) {
      indicatePointWithCss(retrievePointText(itemRef));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, userInfo.config.theme, endPoint, indicatePointWithCss]);

  return (
    <li ref={itemRef} className={active ? "active" : ""}>
      {children}
    </li>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const sideBar = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [sidebarStyles, sidebarApi] = useSpring(() => {
    return {
      from: { left: "-100%" },
    };
  });

  const [overlayStyles, overlayApi] = useSpring(() => {
    return {
      from: { opacity: 0, display: "none" },
    };
  });

  const asideToggled = useTypedSelector(
    (state) => state.unitStates
  ).sidebarToggled;

  const closeSidebar = (): void => {
    // Hide sidebar
    overlayApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0 },
        });

        await animate({
          to: { display: "none" },
        });
      },
    });
    sidebarApi.start({
      to: {
        left: "-100%",
      },
    });
    dispatch(toggleSidebar(false));
  };

  const openSidebar = (): void => {
    // Show sidebar
    sidebarApi.start({
      to: {
        left: "0%",
      },
    });
    overlayApi.start({
      to: async (animate) => {
        await animate({
          to: { display: "block" },
        });

        await animate({
          to: { opacity: 1 },
        });
      },
    });
    dispatch(toggleSidebar(true));
  };

  useEffect(() => {
    if (asideToggled) {
      openSidebar();
    } else {
      closeSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asideToggled]);

  useEffect(() => {
    if (sideBar && sideBar.current) {
      sideBar.current.style.height = document.body.clientHeight + "px";
    }
  }, []);

  return (
    <Wrapper>
      <animated.div
        onClick={closeSidebar}
        style={overlayStyles}
        className="overlay"
      ></animated.div>
      <SidebarEl ref={sideBar} as={animated.aside} style={sidebarStyles}>
        <ul>
          <NavPoint endPoint="app" active={true}>
            <Link passHref href="/app/">
              <span className="home">
                <i className="fas fa-home"></i>Home
              </span>
            </Link>
          </NavPoint>
          <NavPoint endPoint="affirmations">
            <Link passHref href="/app/affirmations">
              <span>
                <i className="fas fa-brain"></i>Affirmations
              </span>
            </Link>
          </NavPoint>
          <NavPoint endPoint="recaps">
            <Link passHref href="/app/recaps">
              <span>
                <i className="fas fa-archive"></i>Weekly recap archive
              </span>
            </Link>
          </NavPoint>
          <NavPoint endPoint="config">
            <Link passHref href="/app/config">
              <span>
                <i className="fas fa-sliders-h"></i>
                Design configuration
              </span>
            </Link>
          </NavPoint>
          <NavPoint>
            <a
              className="signOut"
              onClick={async (e) => {
                e.preventDefault();
                await router.push("/");
                dispatch(logout());
              }}
            >
              <span>
                <i className="fas fa-sign-out-alt"></i>
                Sign out
              </span>
            </a>
          </NavPoint>
        </ul>
      </SidebarEl>
    </Wrapper>
  );
};

export default Sidebar;
