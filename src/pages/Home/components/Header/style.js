import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { defaultThemes } from "../../../../constants/DefaultThemes";

export const HeaderBackground = styled.div`
  height: 90vh;
  width: 99vw;
  background-color: white;
`;

export const HeaderImage = styled.img`
  heigth: 110%;
  width: 110%;
`;

export const HeaderText = styled.p`
  font-size: 8em;
  color: ${defaultThemes.secondary};
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 3em;
  color: ${defaultThemes.color001};
`;

export const HeaderContainer = styled(Row)`
  display: flex;
  flex: 1;
  height: 90vh;
`;

export const Column = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColumnImage = styled(Col)`
  display: flex;
  align-items: center;
`;

export const HeaderButton = styled.button`
  background: ${defaultThemes.secondary};
  font-size: 20px;
  border: none;
  padding: 18px;
  border-radius: 30px;
  color: white;
  width: 500px;

  &:hover {
    background-color: ${defaultThemes.primary};
  }
`;
