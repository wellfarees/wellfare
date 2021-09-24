import styled from "styled-components";
import { Container } from "../../../styled/reusable";
import { Pfp } from "../..";

const NavContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  margin-top: 7em;

  ${Container} {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const Navigation: React.FC = () => {
  return (
    <NavContainer>
      <Container>
        <Pfp url="/img/sample_pfp.jpg"></Pfp>
      </Container>
    </NavContainer>
  );
};

export default Navigation;
