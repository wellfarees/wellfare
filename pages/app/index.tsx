import { NextPage } from "next";
import { Container } from "../../styled/reusable";
import styled from "styled-components";

const Wrapper = styled.main`
  color: ${(props: any) => props.theme.mainColor};

  p {
    display: inline-block;
  }
`;

const App: NextPage = () => {
  return (
    <Wrapper>
      <p>asasd</p>
    </Wrapper>
  );
};

export default App;
