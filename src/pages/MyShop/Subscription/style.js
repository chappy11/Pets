import styled from "styled-components";
import { Container } from "react-bootstrap";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { HeaderText } from "../../../components";

export const MainView = styled(Container)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  background-color: white;
  cursor: pointer;
`;

export const MonthText = styled.text`
  font-size: 25px;
`;

export const HeadersText = styled.p`
  text-align: center;
  color: ${(props) => props.color};
  font-size: 24px;
`;

export const Price = styled.text`
  font-size: 29px;
  color: gray;
  text-align: center;
`;
