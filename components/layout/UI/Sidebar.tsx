import styled from "styled-components";
import Link from "next/Link";
import { useRouter } from "next/router";
import { useSpring, animated, config } from "react-spring";
import { useEffect, useRef } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { userConfig } from "../../../config/userConfig";
import { themes } from "../../../styled/themes";

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

  li.active {
    background: ${(props: any) => props.theme.maximum};
    border-radius: 13px;
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

const NavPoint: React.FC<{ active?: boolean }> = ({ active, children }) => {
  const { currentPoint } = useTypedSelector((state) => state.point);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const { indicatePoint } = useActions();

  const disableCurrentPoints = (parent: HTMLUListElement): void => {
    parent.querySelectorAll<HTMLElement>(".active")[0].style.backgroundColor =
      "rgba(0, 0, 0, 0)";

    let nodes = parent.querySelectorAll("span")!;

    nodes.forEach((node) => {
      node.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });
  };

  useEffect(() => {
    if (!itemRef) return;
    if (!itemRef.current) return;
    let span = itemRef.current.querySelector<HTMLElement>("span")!;
    let children = span.childNodes[1]!;

    const pointText = children.textContent?.trim();

    if (currentPoint === pointText) {
      disableCurrentPoints(itemRef.current.closest("ul")!);

      span.style.backgroundColor = themes[userConfig.theme].maximum;
    }
  }, [currentPoint]);

  return (
    <li
      ref={itemRef}
      className={active ? "active" : ""}
      onClick={(e) => {
        let spanChild = itemRef?.current?.querySelector<HTMLElement>("span")!;
        let childNodes = spanChild.childNodes[1]!;
        const txt = childNodes.textContent?.trim()!;

        indicatePoint(txt);
        let parent = e.currentTarget.closest("ul")!;

        if (document?.body?.offsetWidth < 1024) {
          const homePoint = parent.querySelector<HTMLElement>(".home")!;
          homePoint.style.backgroundColor = themes[userConfig.theme].maximum;
          return;
        }

        disableCurrentPoints(parent);

        spanChild.style.backgroundColor = e.currentTarget
          .querySelector("span")
          ?.classList.contains("signOut")
          ? "red"
          : themes[userConfig.theme].maximum;
      }}
    >
      {children}
    </li>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const sideBar = useRef<HTMLDivElement>(null);

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

  const { toggleSidebar } = useActions();

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
    toggleSidebar(false);
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
    toggleSidebar(true);
  };

  useEffect(() => {
    if (asideToggled) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [asideToggled]);

  useEffect(() => {
    if (sideBar && sideBar.current) {
      sideBar.current.style.height = document.body.clientHeight + "px";
    }
  }, [document.body.clientHeight]);

  return (
    <Wrapper>
      <animated.div
        onClick={closeSidebar}
        style={overlayStyles}
        className="overlay"
      ></animated.div>
      <SidebarEl ref={sideBar} as={animated.aside} style={sidebarStyles}>
        <ul>
          <NavPoint active={true}>
            <Link href="/app/">
              <span className="home">
                <i className="fas fa-home"></i>Home
              </span>
            </Link>
          </NavPoint>
          <NavPoint>
            <Link href="/app/affirmations">
              <span>
                <i className="fas fa-brain"></i>Affirmations
              </span>
            </Link>
          </NavPoint>
          <NavPoint>
            <Link href="/app/config">
              <span>
                <i className="fas fa-sliders-h"></i>
                Design configuration
              </span>
            </Link>
          </NavPoint>
          <NavPoint>
            <Link href="/app/archive">
              <span>
                <i className="fas fa-archive"></i>Weekly recap archive
              </span>
            </Link>
          </NavPoint>
          <NavPoint>
            <a
              className="signOut"
              onClick={(e) => {
                e.preventDefault();

                //TODO: Do some auth signing out logic

                router.push("/");
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
