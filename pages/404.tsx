import styled from "styled-components";
import { Container } from "../styled/reusable";

const Wrapper = styled.main`
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .info {
      max-width: 350px;
      h1 {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1.3;

        p {
          font-size: 6rem;
          font-weight: 800;
        }
      }
    }
  }

  img {
    width: 1000px;
    height: 80vh;
    position: absolute;
    right: 0;
    background: red;
    top: 55%;
    transform: translateY(-50%);
  }
`;

const Custom404: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <div className="info">
          <h1>
            <p>OOPS...</p>Couldn't find anything here.
          </h1>
        </div>
        <img src="img/404_desktop.svg" alt="404" />
      </Container>
    </Wrapper>
  );
};

export default Custom404;
