import styled from "styled-components";

export const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 85%;

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

export const Button = styled.a`
  color: #fafafa;
  padding: 0.7em 4em;
  font-size: 1.4rem;
  background: #117ee3;
  box-shadow: 0px 0px 7px 1px rgba(48, 89, 232, 0.65);
  border-radius: 5px;
  display: inline-block;
  transition: 0.5s all;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
    background: #2b95f8;
  }
`;
