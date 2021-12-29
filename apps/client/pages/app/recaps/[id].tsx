import { ShrankContainer } from "../../../styled/reusable";
import AdaptiveAnimation from "../../../components/animated/AdaptiveAnimation";
import { formatDate } from "../../../utils/formatDate";
import styled from "styled-components";
import Scroller from "../../../components/Scroller/Scroller";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { NextPage } from "next";
import { useRouter } from "next/router";
import GoBack from "../../../components/Routing/GoBack";
import React from "react";
import { mapRecordsToJsx } from "../../../utils/mapRecordsToJsx";
import { RecordsData } from "../../../components/Records/RecordTypes";

import { useQuery } from "react-apollo";
import { GET_RECAP } from "../../../graphql/queries";

const Wrapper = styled.div`
  margin-bottom: 6em;
  height: auto !important;

  header {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .subtitle {
    line-height: 1.4;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 4em;
    margin: 4em 0;

    h3 {
      margin-bottom: 0.3em;
      line-height: 1.3;
    }

    p.feelings-descr {
      p {
        margin-top: 1em;
        line-height: 1.8em;
      }
    }

    ul {
      padding-left: 2em;
      li {
        list-style-type: disc;
        line-height: 1.5;
        margin-top: 0.5em;
      }
    }
  }

  .records-container {
    p.label {
      margin-bottom: 2em;
    }

    .records {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4em;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      flex-direction: column;
    }

    .records {
      grid-template-columns: 1fr !important;
    }
  }
`;

interface RecapProps {
  getRecap: {
    records: RecordsData;
    description: string;
    startDate: number;
    endDate: number;
  };
}

const Recap: NextPage = () => {
  const size = useScreenSize();
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery<RecapProps>(GET_RECAP, {
    variables: { identifier: parseInt(id as string) },
  });

  return (
    <Wrapper>
      {!loading && data ? (
        <ShrankContainer>
          <header>
            <GoBack />
            <span className="interval">
              {formatDate(new Date(data.getRecap.startDate))} -{" "}
              {formatDate(new Date(data.getRecap.endDate))}
            </span>
            <h2>Weekly recap</h2>
            <p className="subtitle">
              Time to take a look on what you’ve been going through this week.
            </p>
          </header>

          <div className="details">
            <div className="feelings">
              <h3>Feelings</h3>
              <p
                className="feelings-descr"
                dangerouslySetInnerHTML={{
                  __html: data.getRecap.description,
                }}
              ></p>
            </div>

            <div className="gratefulness">
              <h3>Things you’ve been grateful for</h3>
              <ul>
                {data.getRecap.records.map((recordData, index) => {
                  return <li key={index}>{recordData.gratefulness}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className="records-container">
            <p className="label">
              <b>Your records</b>
            </p>

            <div className="records">
              {size ? (
                size < 768 ? (
                  <Scroller>{mapRecordsToJsx(data.getRecap.records)}</Scroller>
                ) : (
                  <>
                    {mapRecordsToJsx(data.getRecap.records).map(
                      (record, index) => {
                        return (
                          <div key={index}>
                            <AdaptiveAnimation>{record}</AdaptiveAnimation>
                          </div>
                        );
                      }
                    )}
                  </>
                )
              ) : null}
            </div>
          </div>
        </ShrankContainer>
      ) : null}
    </Wrapper>
  );
};

export default Recap;
