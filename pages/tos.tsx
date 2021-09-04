import React, { useEffect, useRef } from "react";
import { useReadFile } from "../hooks/useReadFile";
import styled from "styled-components";
import { Container } from "../styled/reusable";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #fafafa;
  padding: 13em 0;

  .titles {
    h1 {
      font-size: 4rem;
      font-weight: 800;
    }

    p {
      font-size: 1.4rem;
      margin-top: 0.5em;
    }
  }

  .tos {
    max-width: 900px;

    p,
    li {
      font-size: 1.6rem;
      line-height: 1.3;
      margin-top: 0.8em;
    }

    h1 {
      margin-top: 2em;
    }
  }
`;

const TOS = () => {
  const [loading, tosText] = useReadFile("tos.txt");
  const tosContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tosContainer.current) {
      tosContainer.current.innerHTML = tosText;
    }
  }, [loading]);
  return (
    <Wrapper>
      <Container>
        <div className="titles">
          <h1>Terms of service</h1>
          <p>For those who are concerned</p>
        </div>
        <div ref={tosContainer} className="tos"></div>
      </Container>
    </Wrapper>
  );
};

export default TOS;
