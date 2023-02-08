import React, { useEffect, useRef } from "react";
import { staticFileFetch } from "../hooks/useReadFile";
import styled from "styled-components";
import { Container } from "../styled/reusable";
import { GetStaticProps, NextPage } from "next";
import { CLIENT_URL } from "../endpoints";
import AdaptiveAnimation from "../components/animated/AdaptiveAnimation";

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
      word-wrap: break-word;
    }

    h2 {
      margin-top: 2em;
    }

    p.contacts {
      margin-top: 3em;
    }
  }
`;

const TOS: NextPage<{ text: string }> = ({ text }) => {
  const tosContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tosContainer.current) {
      tosContainer.current.innerHTML = text;
    }
  }, [text]);

  return (
    <Wrapper>
      <Container>
        <div className="titles">
          <AdaptiveAnimation>
            <h1>Terms of service</h1>
          </AdaptiveAnimation>
          <AdaptiveAnimation>
            <p>For those who are concerned</p>
          </AdaptiveAnimation>
        </div>
        <div ref={tosContainer} className="tos"></div>
      </Container>
    </Wrapper>
  );
};

export default TOS;

export const getStaticProps: GetStaticProps = async () => {
  let text = "Failed to fetch Wellfare TOS";
  try {
    // TODO: Change to actual url when deploying the whole app
    text = await staticFileFetch(`${CLIENT_URL}/tos.txt`);
  } catch (e) {
  } finally {
    return {
      props: { text },
      revalidate: 100,
    };
  }
};
