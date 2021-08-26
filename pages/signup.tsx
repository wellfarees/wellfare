import { useEffect } from "react";
import Link from "next/Link";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Container } from "../styled/reusable";
import { GlowingBLue } from "../styled/reusable";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Wrapper = styled.main`
  height: 100vh;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Container} {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }

  .info {
    h1 {
      font-size: 5.5rem;
      font-weight: 800;
      line-height: 1.2;
      width: 350px;
      margin-top: 1.2em;
    }

    p {
      font-size: 1.6rem;
      margin-top: 1em;
      width: 380px;
      line-height: 1.5;
    }
  }

  .signUp-card {
    padding: 3.5em;
    display: flex;
    flex-direction: column;
    background-image: url("img/blob-scene-haikei.svg");
    background-size: cover;
    background-repeat: none;
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.05);
    border-radius: 9px;

    form {
      button {
        ${GlowingBLue}
        width: 100%;
        margin-top: 1.5em;
      }
    }

    .input-block {
      position: relative;
      margin-top: 2em;

      &:first-of-type {
        margin-top: 0;
      }

      label {
        position: absolute;
        left: 1.5em;
        top: -0.5em;
        font-size: 1.1rem;
        opacity: 0;
        display: none;
      }

      input {
        background: #ffffff;
        padding: 0.7em 1.3em;
        border-radius: 4px;
        outline: none;
        border: none;
        font-size: 1.5rem;

        &::placeholder {
          color: #bfbfbf;
        }
      }
    }

    .divider {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5em;

      span {
        color: #a6a6a6;
        font-size: 1.2rem;
      }

      &:before,
      &:after {
        content: "";
        display: inline-block;
        height: 2px;
        width: 40%;
        background-color: #f0f0f0;
        position: absolute;
        top: 50%;
        bottom: 50%;
      }

      &:before {
        left: 0;
      }

      &:after {
        right: 0;
      }
    }

    .oAuth-methods {
      .method {
        padding: 0.9em;
        background-color: #fff;
        border: 1px solid #ececec;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.4rem;
        border-radius: 6px;
        font-weight: 500;
        margin-top: 1.5em;
        transition: 0.3s;

        &:hover {
          background-color: #fafafa;
        }

        i {
          margin-right: 0.7em;
        }
      }
    }

    .form-cta {
      text-align: center;
      color: #1d1d1d;
      margin-top: 2em;
      margin-bottom: -0.5em;
      font-size: 1.2rem;

      a {
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }
`;

const signUp = () => {
  return (
    <div>
      <Navigation />
      <Wrapper>
        <Container>
          <div className="info">
            <h1>Sign up now &amp; start journaling</h1>
            <p>
              Wanna do it quick? We got you covered - choose whatever auth
              method you like!
            </p>
          </div>
          <div className="signUp-card">
            <form onClick={(e) => {}} className="signUp-form">
              <div className="main-inputs">
                <div className="input-block">
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="password">Your password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <button>Sign up</button>
            </form>
            <div className="divider">
              <span>or</span>
            </div>
            <div className="oAuth-methods">
              <div className="method">
                <i className="fab fa-apple"></i>
                AppleId
              </div>
              <div className="method">
                <i className="fab fa-google"></i>
                Google
              </div>
            </div>
            <p className="form-cta">
              Already been here?{" "}
              <Link href="/signin">
                <a href="#"> Sign in</a>
              </Link>
              !
            </p>
          </div>
        </Container>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default signUp;
