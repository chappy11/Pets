import { style } from "@mui/system";
import { Card } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { defaultThemes } from "../../../../constants/DefaultThemes";

const shake = keyframes`
0% { transform: translate(1px, 1px) rotate(0deg); }
10% { transform: translate(-1px, -2px) rotate(-1deg); }
20% { transform: translate(-3px, 0px) rotate(1deg); }
30% { transform: translate(3px, 2px) rotate(0deg); }
40% { transform: translate(1px, -1px) rotate(1deg); }
50% { transform: translate(-1px, 2px) rotate(-1deg); }
60% { transform: translate(-3px, 1px) rotate(0deg); }
70% { transform: translate(3px, 1px) rotate(-1deg); }
80% { transform: translate(-1px, -1px) rotate(1deg); }
90% { transform: translate(1px, 2px) rotate(0deg); }
100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const CustomizeCard = styled(Card)`
  width: 250px;
  margin: 10px;
  padding: 0px;
  height: 300px;
  opacity: 1;
  cursor: pointer;
  border:none;
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
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-align: center;
  color: ${defaultThemes.primary};
  
`;

export const Subtitle = styled.p`
  font-size: 0.9em;
  text-align:center;
`;

export const Title = styled(Card.Title)`
  text-align:center;
  font-size:18px;
`;
