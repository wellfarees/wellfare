import { NextPage } from "next";
import styled from "styled-components";
import { Container } from "../styled/reusable";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";

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
    margin-top: 5em;
    font-style: italic;
    font-size: 1.6rem;
    gap: 1em;
    max-width: 320px;
    line-height: 1.8;

    b {
      display: inline-flex;
      align-items: center;
      gap: 0.7em;
    }
  }

  .stay-updated {
    display: inline-block;
    color: #f1f1f1;
    padding: 5em;
    background: linear-gradient(180deg, #60b2ff 0%, #0889ff 100%);
    border-radius: 8px;
    margin-top: 8em;

    h3 {
      font-size: 2.3rem;
      text-transform: uppercase;
      font-weight: 900;
    }

    p {
      font-size: 1.6rem;
      margin-top: 0.8em;
    }

    ul {
      margin-top: 3em;

      li {
        display: inline-block;
        margin-right: 2.5em;

        a {
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.8em;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 1.6rem;
    }
  }

  @media only screen and (max-width: 547px) {
    .stay-updated {
      ul {
        li {
          display: block;
          margin-top: 2.5em;
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Wellfare</title>
      </Head>
      <Container>
        <h1>Wellfare is currently under maintenance.</h1>
        <p>Our services will be up and running again soon.</p>
        {/* <p className="eta">
          <b>ETA</b>: not determined
        </p> */}
        <div className="stay-updated">
          <h3>Stay updated</h3>
          <p>Don&apos;t miss anything important.</p>
          <ul>
            <li>
              <a href="https://www.instagram.com/wellfarespace/">
                {" "}
                <FontAwesomeIcon icon={faInstagram} />
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/wellfarespace">
                {" "}
                <FontAwesomeIcon icon={faTwitter} />
                Twitter
              </a>
            </li>
            <li>
              <a href="https://github.com/wellfarees/wellfare">
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <p className="thanks">
          Sorry for the inconvinience and thank you for your patience,{" "}
          <b>
            {" "}
            Wellfare
            <Image
              className="logo"
              width={20}
              height={15}
              src={"/wellfare-logo.png"}
            ></Image>{" "}
          </b>{" "}
        </p>
      </Container>
    </Wrapper>
  );
};

export default Home;
