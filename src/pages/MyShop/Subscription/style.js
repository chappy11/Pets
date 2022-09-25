import styled from "styled-components";
import { Container } from "react-bootstrap";
import { defaultThemes } from "../../../constants/DefaultThemes";

export const MainView = styled(Container)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.color};
  padding: 10px;
  cursor: pointer;
`;

export const MonthText = styled.text`
  font-size: 25px;
  color: ${defaultThemes.white};
`;
