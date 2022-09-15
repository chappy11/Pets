import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const BodyText = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-align: center;
  color: ${defaultThemes.secondary};
`;
