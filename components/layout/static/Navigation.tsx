import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { animated } from "react-spring";
import { Container } from "../../../styled/reusable";
import styled from "styled-components";
import useNavToggler from "../../../hooks/useNavToggler";
import { navStateContext } from "../../../pages/_app";

const NavWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);

  ${Container} {
    position: relative;
    padding: 3em 15px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  ul.nav-points {
    font-size: 0;

    li {
      font-size: 1.4rem;
      display: inline-block;
      margin-right: 4em;

      a:hover {
        text-decoration: underline;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .logo {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .burger {
    height: 20px;
    display: none;
    justify-content: space-between;
    cursor: pointer;

    span {
      height: 100%;
      width: 0.1em;
      background-color: #000;
      float: left;
      margin-right: 7px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .close-menu {
    display: none;
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    .burger {
      display: flex;
    }

    .nav-points-wrapper {
      height: 100vh;
      position: fixed;
      display: flex;
      flex-direction: column;
      right: -100%;
      top: 0;
      background-color: #f8f8f8;
      max-width: 80vw;
      width: 200px;
      z-index: 1000000;
      align-items: flex-end;

      li {
        width: 100%;
      }

      a {
        display: inline-block;
        padding: 1.5em 2em;
        border-bottom: 1px solid #e7e7e7;
        margin-right: 0;
        width: 100%;

        &:first-of-type {
          border-top: 1px solid #e7e7e7;
        }
      }

      .close-menu {
        display: inline-block;
        font-size: 2rem;
        padding: 1em;
      }
    }
  }
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100000;
  cursor: pointer;
  opacity: 0;
  display: none;
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useContext(navStateContext);

  const [overlayStyles, navStyles] = useNavToggler(isOpen);

  return (
    <NavWrapper>
      <Overlay
        as={animated.div}
        style={overlayStyles}
        onClick={() => {
          setIsOpen(false);
        }}
      />

      <Container>
        <Nav>
          <span className="logo">Wellfaree</span>

          <animated.div style={navStyles} className="nav-points-wrapper">
            <span
              className="close-menu"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              &times;
            </span>

            <ul className="nav-points">
              <li>
                <Link href="/">
                  <a href="#">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a href="#">Authorize</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a href="#">About</a>
                </Link>
              </li>
              <li>
                <Link href="tos">
                  <a href="#">TOS</a>
                </Link>
              </li>
            </ul>
          </animated.div>

          <div
            className="burger"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <span></span>
            <span></span>
          </div>
        </Nav>
      </Container>
    </NavWrapper>
  );
};

export default Navigation;
