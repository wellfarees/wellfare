import styled from "styled-components";
import { GOOGLE_AUTH_LINK } from "../../constants";
import Link from "next/dist/client/link";

const Wrapper = styled.div`
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
`;

const OAuthMethods: React.FC = () => {
  return (
    <Wrapper>
      <div className="divider">
        <span>or</span>
      </div>
      <div className="oAuth-methods">
        <div className="method">
          <i className="fab fa-apple"></i>
          AppleId
        </div>
        <Link href={GOOGLE_AUTH_LINK}>
          <div className="method">
            <i className="fab fa-google"></i>
            Google
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default OAuthMethods;
