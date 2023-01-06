import { NextPage } from "next";
import styled from "styled-components";
import { Container } from "../styled/reusable";
import Image from "next/image";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 3.9rem;
    line-height: 1.5;
    max-width: 700px;
  }

  p {
    font-size: 2rem;
    margin-top: 1em;
    line-height: 1.5;
  }

  p.thanks {
    margin-top: 6em;
    font-style: italic;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 1em;
  }

  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 1.6rem;
    }
  }
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Container>
        <h1>Wellfare is currently under maintenance.</h1>
        <p>Our backend service will be up and running again soon.</p>
        <p className="eta">
          <b>ETA</b>: 22:00 GMT+2, January 7th
        </p>
        <p className="thanks">
          Thank you for choosing Wellfare{" "}
          <Image
            className="logo"
            width={20}
            height={20}
            src={"/favicon.ico"}
          ></Image>{" "}
        </p>
      </Container>
    </Wrapper>
  );
};

export default Home;
