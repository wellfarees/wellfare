import React from "react";
import { Container } from "../../styled/reusable";
import styled from "styled-components";

const NavWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  ${Container} {
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 5em 0;
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

  @media only screen and (max-width: 425px) {
    .burger {
      display: flex;
    }

    ul.nav-points {
      display: none;
    }
  }
`;

const Navigation: React.FC = () => {
  return (
    <NavWrapper>
      <Container>
        <Nav>
          <span className="logo">Wellfaree</span>

          <ul className="nav-points">
            <li>
              <a href="#">Authorize</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">TOS</a>
            </li>
          </ul>

          <div className="burger">
            <span></span>
            <span></span>
          </div>
        </Nav>
      </Container>
    </NavWrapper>
  );
};

export default Navigation;
