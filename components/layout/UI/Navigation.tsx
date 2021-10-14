import styled from "styled-components";
import { Container } from "../../../styled/reusable";
import { Pfp } from "../..";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useRouter } from "next/router";
import { useActions } from "../../../hooks/useActions";

const NavContainer = styled.div`
  width: 100%;
  left: 0;
  margin-top: 7em;
  z-index: -1;

  * {
    z-index: 10 !important;
    position: relative;
  }

  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: -8em;
  }

  .pfp {
    position: absolute;
    top: 7.5em;
    right: 0;
  }

  @media only screen and (max-width: 1024px) {
    .pfp {
      position: static;
    }

    ${Container} {
      margin-top: -2em;
      align-items: center;
    }
  }
`;

const ActionPoint = styled.span`
  display: none;

  .fa-bars {
    font-size: 2.4rem;
    cursor: pointer;
  }

  span.back {
    cursor: pointer;

    i {
      margin-right: 0.5em;
    }
  }

  @media only screen and (max-width: 1024px) {
    display: inline-block;
  }
`;

const Navigation: React.FC = () => {
  const storage = useTypedSelector((state) => state.localStorage!);
  const router = useRouter();
  const { toggleSidebar } = useActions();

  return (
    <NavContainer>
      <Container>
        <ActionPoint>
          {router.pathname === "/app" ? (
            <i
              onClick={() => {
                toggleSidebar(true);
              }}
              className="fas fa-bars"
            ></i>
          ) : (
            <span
              className="back"
              onClick={() => {
                router.push("/app");
              }}
            >
              <i className="fas fa-angle-left"></i>
              Home
            </span>
          )}
        </ActionPoint>
        <Pfp url="/img/sample_pfp.jpg"></Pfp>
      </Container>
    </NavContainer>
  );
};

export default Navigation;
