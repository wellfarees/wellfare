import styled from "styled-components";
import { useScreenSize } from "../../hooks/useScreenSize";
import Link from "next/link";
import { useActions } from "../../hooks/useActions";

const Wrapper = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  font-weight: bold;
  margin-bottom: 2em;
  cursor: pointer;

  span {
    display: inline-block;
    height: 1px;
    width: 150px;
    background-color: ${(props) => props.theme.mainColor};
    transition: 0.3s;
  }

  &:hover {
    span {
      width: 200px;
    }
  }
`;

const GoBack: React.FC = () => {
  const { indicatePoint } = useActions();
  const size = useScreenSize();
  return (
    <>
      {size ? (
        size < 1024 ? null : (
          <Link href="/app">
            <Wrapper
              onClick={() => {
                indicatePoint("Home");
              }}
            >
              <p>Go back</p>
              <span></span>
            </Wrapper>
          </Link>
        )
      ) : null}
    </>
  );
};

export default GoBack;
