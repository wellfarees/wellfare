import styled, { css } from "styled-components";

const ContainerStyles = css`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 80%;

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

export const Container = styled.div`
  ${ContainerStyles}
`;

export const ShrankContainer = styled.div`
  ${ContainerStyles};

  @media only screen and (min-width: 768px) {
    padding-left: 420px;
  }
`;

const flexCentered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlowingBLue = css`
  color: #fafafa;
  padding: 0.7em 4em;
  font-size: 1.4rem;
  background: #117ee3;
  box-shadow: 0px 0px 7px 1px rgba(48, 89, 232, 0.65);
  border-radius: 5px;
  display: inline-block;
  transition: 0.5s all;
  outline: none;
  border: none;

  @media only screen and (max-width: 425px) {
    padding: 1em 4em;
  }

  ${flexCentered}

  &:hover {
    cursor: pointer;
    background: #2b95f8;
  }
`;

export const Button = styled.a`
  ${GlowingBLue}

  &:hover {
    transform: translateY(-3px);
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 1.6rem;
  max-width: 450px;
  line-height: 1.5;

  @media only screen and (max-width: 425px) {
    width: 100%;
  }
`;
