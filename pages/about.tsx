import { Container } from "../styled/reusable";
import styled from "styled-components";
import Head from "next/dist/shared/lib/head";
import { GetStaticProps, NextPage } from "next";

// GraphQL & Apollo related stuff
import { DEVELOPERS_QUERY } from "../graphql/queries";
import { DevelopersQueryInterface } from "../graphql/queriesTypes";
import client from "../graphql/client";
import { ApolloQueryResult } from "apollo-client";

const AboutInfo = styled.main`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
  }

  .description {
    max-width: 450px;
    text-align: center;

    p {
      font-size: 1.6rem;
      line-height: 1.5;
      margin-top: 1em;
    }
  }

  .cta {
    margin-top: 2em;
    font-size: 1.6rem;
    font-style: italic;
    line-height: 1.5;

    a {
      color: #032bff;
      text-decoration: underline;
    }
  }

  @media only screen and (max-width: 440px) {
    height: 100vh !important;
    /* padding: 8em 0; */

    h1 {
      font-size: 2rem;
      margin-bottom: 0.5em;
    }

    p {
      font-size: 1.3rem;
    }
  }

  @media only screen and (max-width: 816px) and (max-height: 425px) {
    height: auto;
    padding: 14em 0;
  }
`;

const DevelopersSection = styled.section`
  background-color: #fdfdfd;
  height: 70vh;
  display: flex;
  align-items: center;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
  }

  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .developers {
    display: flex;
    flex-direction: column;

    .developer {
      display: inline-flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      margin-top: 2.5em;

      .dev-info {
        width: 230px;
      }

      .pfp {
        width: 60px;
        height: 60px;
        display: inline-block;
        background-color: #ccc;
        border-radius: 100%;
      }

      @media only screen and (max-width: 420px) {
        .dev-info {
          width: 150px;
        }

        .pfp {
          width: 45px;
          height: 45px;
        }
      }

      .role {
        color: #4b4b4b;
        font-size: 1.3rem;
        margin-bottom: 0.5em;
        line-height: 1.2;
      }

      .name {
        font-size: 1.4rem;
        font-weight: 600;
      }
    }

    .ltr {
      .pfp {
        margin-right: 2em;
      }
    }
  }

  @media only screen and (max-width: 440px) {
    height: auto !important;
    padding: 8em 0;

    h1 {
      font-size: 2rem;
      margin-bottom: 0.5em;
    }
  }

  @media only screen and (max-width: 816px) and (max-height: 425px) {
    height: auto;
    padding: 14em 0;
  }
`;

const About: NextPage<ApolloQueryResult<DevelopersQueryInterface>> = ({
  data,
}) => {
  return (
    <div>
      <Head>
        <title>About Wellfaree</title>
      </Head>

      <AboutInfo>
        <Container>
          <h1>About Wellfaree</h1>
          <div className="description">
            <p>
              Wellfaree is an app thats allows you to journal your thoughts,
              emotions &amp; feelings and store it all in one place.
            </p>
            <p>
              We’re open source and using <b>React</b>, <b>Redux</b> &amp;{" "}
              <b>NextJs</b> as far as fronted goes. As for backend, we use{" "}
              <b>NodeJs</b>, <b>GraphQL</b> with <b>Prisma</b> and more!
            </p>
          </div>
          <p className="cta">
            Take a glance ar our source code <a href="#">Here</a>!
          </p>
        </Container>
      </AboutInfo>
      <DevelopersSection>
        <Container>
          <h1>Wellfaree Developers</h1>
          <div className="developers">
            {data &&
              data.company.developers.map((developer, index) => {
                const direction = index % 2 === 0 ? "ltr" : "rtl";
                return (
                  <div className={`developer ${direction}`} key={index}>
                    {direction === "ltr" ? <div className="pfp"></div> : null}

                    <div className="dev-info">
                      <p className="role">{developer.roles.join(" & ")}</p>
                      <p className="name">{developer.name}</p>
                    </div>

                    {direction === "rtl" ? <div className="pfp"></div> : null}
                  </div>
                );
              })}
          </div>
        </Container>
      </DevelopersSection>
    </div>
  );
};

export default About;
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await client.query({
    query: DEVELOPERS_QUERY,
  });

  return {
    props: res,
    revalidate: 10,
  };
};
