import styled from "styled-components";
import { defaultThemes } from "../../../../constants/DefaultThemes";

export const HeaderBackground = styled.div`
  height: 90vh;
  width: 100vw;
`;

export const HeaderImage = styled.img`
  heigth: 400px;
  width: 400px;
`;

export const HeaderText = styled.p`
  font-size: 4em;
  color: ${defaultThemes.secondary};
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 2em;
  color: ${defaultThemes.color001};
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  height: 90vh;
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
