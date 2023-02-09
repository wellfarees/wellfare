import styled, { css } from "styled-components";
import { fontSizes } from "../config/userConfig";

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

  @media only screen and (max-width: 1024px) and (max-height: 1400px) and (min-height: 1024px) {
    width: 85%;
  }
`;

export const Container = styled.div`
  ${ContainerStyles}
`;

export const ShrankContainer = styled.div`
  ${ContainerStyles};

  @media only screen and (min-width: 1024px) {
    padding-left: 420px;
  }
`;

const flexCentered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlowingBlue = css`
  color: #fafafa !important;
  padding: 0.7em 4em;
  /* background: #117ee3; */
  /* box-shadow: 0px 0px 7px 1px rgba(48, 89, 232, 0.65); */
  /* border-radius: 5px; */
  display: inline-block;
  transition: 0.5s all;
  outline: none;
  border: none;
  display: inline-block;
  font-size: ${fontSizes.base}px;

  background: linear-gradient(180deg, #60b2ff 0%, #0889ff 100%);
  border-radius: 6px;

  @media only screen and (max-width: 425px) {
    padding: 1em 4em;
    width: 100%;
  }

  ${flexCentered}

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px 4px rgba(17, 126, 227, 0.2);
  }
`;

export const Button = styled.a`
  ${GlowingBlue}

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
