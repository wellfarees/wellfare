import React from "react";
import styled from "styled-components";

interface CardProps {
  title: string;
  description: string;
}

const CardContainer = styled.div`
  padding: 2.9em 3em;
  filter: drop-shadow(0px 0px 22px rgba(0, 0, 0, 0.05));
  background-color: #fff;
  max-width: 250px;
  border-radius: 8px;
  box-sizing: border-box;

  p {
    margin-top: 0.5em;
    font-size: 1.4rem;
    line-height: 1.5;
  }

  h4 {
    font-size: 1.7rem;
    line-height: 1.2;
  }
`;

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <CardContainer>
      <h4>{title}</h4>
      <p>{description}</p>
    </CardContainer>
  );
};

export default Card;
