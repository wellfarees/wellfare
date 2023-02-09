import styled from "styled-components";
import { Container } from "../../../styled/reusable";
import { UserPfp } from "../../Pfp/Pfp";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { toggleSidebar } from "../../../redux/actions/unitStatesSlice";

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

  .pfpContainer {
    position: absolute;
    top: 7.5em;
    right: 0;
  }

  @media only screen and (max-width: 1024px) {
    .pfpContainer {
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
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <NavContainer>
      <Container>
        <ActionPoint>
          {router.pathname === "/app" ? (
            <i
              onClick={() => {
                dispatch(toggleSidebar(true));
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
        <div className="pfpContainer">
          <UserPfp />
        </div>
      </Container>
    </NavContainer>
  );
};

export default Navigation;
