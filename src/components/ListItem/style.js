import { Col } from "react-bootstrap";
import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const Label = styled.text`
  font-size: 18px;
  color: ${defaultThemes.secondary};
`;

export const Value = styled.text`
  font-size: 18px;
  color: gray;
`;

export const ValueContainer = styled(Col)`
  display: flex;
  justify-content: ${(props) => props.alignment};
  align-items: center;
`;
