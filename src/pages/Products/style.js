import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";
import { Card } from "react-bootstrap";

export const TextTitle = styled.p`
  color: ${defaultThemes.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const CustomizeCard = styled(Card)`
  width: 250px;
  margin: 10px;
  padding: 0px;
  height: 250px;
  opacity: 1;
  cursor: pointer;
  border: 1px solid lightgrey;
  shadow: 1px;
  &:hover {
    visibility: visible;
    opacity: 0.5;
    transition: opacity 0.3s, visibility 0.3s;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
`;

export const BodyText = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: ${defaultThemes.secondary};
`;

export const Subtitle = styled.p`
  font-size: 0.9em;
  text-align: center;
`;

export const Title = styled(Card.Title)`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

export const Section = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${defaultThemes.white};
  padding-top: 20px;
`;
