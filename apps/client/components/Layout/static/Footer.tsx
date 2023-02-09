import styled from "styled-components";
import { Container } from "../../../styled/reusable";
import Link from "next/link";

const FooterEl = styled.footer`
  width: 100%;
  padding: 9em 0;
  position: relative;
  z-index: 4;
  background-color: #fff;

  .sections {
    display: flex;

    .nav-section {
      margin-right: 5em;

      &:last-of-type {
        margin-right: 0;
      }
    }

    h3 {
      font-size: 1.7rem;
      margin-bottom: 0.8em;
    }

    ul {
      font-size: 0;

      li {
        font-size: 1.4rem;
        line-height: 2;

        a {
          i {
            margin-right: 0.6em;
          }
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .copyright {
    font-size: 1.4rem;
    margin-top: 3em;
    color: #6b6b6b;
    line-height: 1.7;
  }

  @media only screen and (max-width: 768px) {
    .sections {
      flex-direction: column;

      .nav-section {
        margin-right: 0;
        margin-top: 4em;

        &:first-of-type {
          margin-top: 0em;
        }
      }
    }
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <FooterEl>
      <Container>
        <div className="footer-nav">
          <div className="sections">
            <div className="nav-section">
              <h3>Navigation</h3>
              <ul>
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
              </ul>
            </div>
            <div className="nav-section">
              <h3>About &amp; Credits</h3>
              <ul>
                <li>
                  <Link href="/about">
                    <a href="#">About &amp; Developer credits</a>
                  </Link>
                </li>
                <li>
                  <Link href="/tos">
                    <a href="#">Terms of Service</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav-section">
              <h3>Other platforms</h3>
              <ul>
                <li>
                  <a
                    href="https://www.instagram.com/wellfarespace/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram"></i>Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/wellfarespace"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter"></i>Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/wellfarees/wellfare"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github"></i>Source code
                  </a>
                </li>
                {/* TODO: Create and link Wellfare twitter and discord */}
              </ul>
            </div>
          </div>
          <p className="copyright">
            Copyright ©Wellfare™ {year}. All rights reserved.
          </p>
        </div>
      </Container>
    </FooterEl>
  );
};

export default Footer;
