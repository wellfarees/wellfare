import React from "react";
import { Container } from "../../styled/reusable";
import styled from "styled-components";

const NavWrapper = styled.div`
  ${Container} {
    position: relative;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5em 0;
  position: absolute;
  width: 100%;

  ul.nav-points {
    font-size: 0;

    li {
      font-size: 1.4rem;
      display: inline-block;
      margin-right: 4em;
    }
  }

  .logo {
    font-size: 1.4rem;
    font-weight: bold;
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
        </Nav>
      </Container>
    </NavWrapper>
  );
};

export default Navigation;
