import styled from "styled-components";
import Link from "next/link";
import { useActions } from "../../hooks/useActions";

const Card = styled.div`
  background: ${(props: any) =>
    props.theme.mainColor === "#fff"
      ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("/img/blob-scene-grayscale.svg")`
      : `url("/img/blob-scene-grayscale.svg")`};
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 500px;
  position: relative;
  border-radius: 20px;
  padding: 3em;

  .contents {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5em;
  }

  h3 {
    max-width: 300px;
    font-weight: 400;
    line-height: 1.5em;
  }

  p {
    color: ${(props: any) => props.theme.shadedColor};
    margin-bottom: 0.5em;

    b {
      font-weight: 600;
    }
  }

  span.cta {
    font-weight: 600;
    cursor: pointer;

    i {
      transition: 0.3s;
      margin-left: 0.7em;
    }

    &:hover {
      i {
        transform: translateX(3px);
      }
    }
  }

  @media only screen and (max-width: 425px) {
    h3 {
      line-height: 1.4;
    }
  }
`;

const RecapCard: React.FC<{ records: number }> = ({ records }) => {
  const { indicatePoint } = useActions();

  return (
    <Card className="recap">
      <div className="contents">
        <h3>
          Your weekly recap is here. <b>Take a look!</b>
        </h3>
        <p>
          You&apos;ve got <b>{records} new records</b> this week.
        </p>

        <Link href="/app/recap">
          <span
            className="cta"
            onClick={() => {
              indicatePoint(null);
            }}
          >
            Let&apos;s check it out <i className="fas fa-arrow-right"></i>
          </span>
        </Link>
      </div>
    </Card>
  );
};

export default RecapCard;
