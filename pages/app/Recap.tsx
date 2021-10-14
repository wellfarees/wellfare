import { ShrankContainer } from "../../styled/reusable";
import Record from "../../components/Records/Record";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { formatDate } from "../../utils/formatDate";
import styled from "styled-components";
import Scroller from "../../components/Scroller/Scroller";
import { useScreenSize } from "../../hooks/useScreenSize";
import { NextPage } from "next";

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
    gap: 4em;
    margin: 4em 0;

    h3 {
      margin-bottom: 0.3em;
      line-height: 1.3;
    }

    p,
    ul {
      max-width: 300px;
    }

    p.feelings-descr {
      line-height: 1.5em;
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

const Recap: NextPage = () => {
  const size = useScreenSize();

  return (
    <Wrapper>
      <ShrankContainer>
        <header>
          <span className="interval">
            {formatDate(new Date())} - {formatDate(new Date())}
          </span>
          <h2>Weekly recap</h2>
          <p className="subtitle">
            Time to take a look on what you’ve been going through this week.
          </p>
        </header>

        <div className="details">
          <div className="feelings">
            <h3>Feelings</h3>
            <p className="feelings-descr">
              Very diverse, your emotions range from being very unstable to
              feeling happy. You’re going through period of <b>mania</b>.
            </p>
          </div>

          <div className="gratefulness">
            <h3>Things you’ve been grateful for</h3>
            <ul>
              <li>breathing fresh air</li>
              <li>having a lot of free time</li>
              <li>Dropping outta college while its not too late lmao</li>
            </ul>
          </div>
        </div>
        <div className="records-container">
          <p className="label">
            <b>Your records</b>
          </p>

          <div className="records">
            {size ? (
              size < 768 && (
                <Scroller>
                  <Record
                    data={{
                      date: new Date(),
                      description:
                        "Feelings good today tbh, nothing special, you know? Just on my grind, isall.",
                      emoji: "😈",
                      feelings: "Feeling fresh",
                    }}
                  />
                  <Record
                    data={{
                      date: new Date(),
                      description:
                        "Feelings good today tbh, nothing special, you know? Just on my grind, isall.",
                      emoji: "😈",
                      feelings: "Feeling fresh",
                    }}
                  />
                  <Record
                    data={{
                      date: new Date(),
                      description:
                        "Feelings good today tbh, nothing special, you know? Just on my grind, isall.",
                      emoji: "😈",
                      feelings: "Feeling fresh",
                    }}
                  />
                </Scroller>
              )
            ) : (
              <>
                {" "}
                <AdaptiveAnimation>
                  <Record
                    data={{
                      date: new Date(),
                      description:
                        "Feelings good today tbh, nothing special, you know? Just on my grind, isall.",
                      emoji: "😈",
                      feelings: "Feeling fresh",
                    }}
                  />
                </AdaptiveAnimation>
                <AdaptiveAnimation>
                  <Record
                    data={{
                      date: new Date(),
                      description:
                        "Feelings are good today tbh, nothing special, you know? Just on my grind, isall.",
                      emoji: "😈",
                      feelings: "Feeling fresh",
                    }}
                  />
                </AdaptiveAnimation>
                <AdaptiveAnimation>
                  <Record
                    data={{
                      date: new Date(),
                      description:
                        "Feelings good today tbh, nothing special, you know? Just on my grind, isall.",
                      emoji: "😈",
                      feelings: "Feeling fresh",
                    }}
                  />
                </AdaptiveAnimation>
              </>
            )}
          </div>
        </div>
      </ShrankContainer>
    </Wrapper>
  );
};

export default Recap;
