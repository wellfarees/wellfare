import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import { Container } from "../styled/reusable";
import { GlowingBlue } from "../styled/reusable";

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
    margin-top: 5em;
    position: relative;
    z-index: 3;

    .info {
      max-width: 350px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 3em;

      img {
        display: none;
      }

      h1 {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1.3;
        position: relative;
        z-index: 1;

        p {
          font-size: 8rem;
          font-weight: 800;
          margin-bottom: -0.1em;
        }
      }

      p.description {
        font-size: 1.6rem;
        line-height: 1.5;
      }

      .redirection {
        h3 {
          font-size: 2rem;
          line-height: 1.5;
        }

        ul {
          margin-top: 3em;
          li {
            font-size: 1.4rem;
            margin-top: 1em;
            outline: none;
            border: none;
            list-style: inside;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      button {
        ${GlowingBlue}
        margin-top: 1em;
      }
    }
  }

  .desktop-illustration {
    height: 100%;
    width: 55%;
    position: absolute;
    right: -7em;
    top: 55%;
    transform: translateY(-50%);
    z-index: 0;
  }

  .mobile_ill_container {
    margin: 4em 0 -2em 0;
    display: none !important;
  }

  @media only screen and (max-width: 769px) {
    .info {
      max-width: 100% !important;
    }

    .desktop-img {
      display: none !important;
    }

    ${Container} {
      margin: 7em 0;
    }
  }

  @media only screen and (max-width: 816px) and (max-height: 425px) {
    .info {
      margin: 4em 0 !important;
    }

    .mobile_ill_container {
      display: none !important;
    }

    button {
      width: auto !important;
    }
  }

  @media only screen and (max-width: 424px) {
    .mobile_illustration {
      width: 250px;
    }

    .mobile_ill_container {
      display: block !important;
    }

    button {
      width: 100%;
    }

    .info {
      grid-gap: 2em !important;
    }

    h1 {
      font-size: 3rem !important;

      p {
        font-size: 4rem !important;
      }
    }
  }
`;

const Custom404: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <div className="info">
          <div className="mobile_ill_container">
            <Image
              alt="404"
              className="mobile_illustration"
              height={500}
              width={500}
              src="/img/404_mobile-svg.svg"
            />
          </div>

          <h1>
            <p>OOPS...</p>Couldn&apos;t find anything here.
          </h1>

          <p className="description">
            Seems like the page you are looking for does not exist.
          </p>

          <div className="redirection">
            <h3>You might find these quite useful:</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/tos">Terms of service</Link>
              </li>
            </ul>
          </div>
          <Link href="/" passHref>
            <button>Back home</button>
          </Link>
        </div>
      </Container>
      <div className="desktop-illustration">
        <Image
          alt="404"
          className="desktop-img"
          src={"/img/404_desktop-svg.svg"}
          layout="fill"
        />
      </div>
    </Wrapper>
  );
};

export default Custom404;
