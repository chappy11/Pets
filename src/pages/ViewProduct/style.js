import { Row } from "react-bootstrap";
import styled from "styled-components";

export const ItemRow = styled(Row)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.fontColor};
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.color};
  border: solid ${(props) => props.color}px lightgrey;
  cursor: pointer;
  opacity: 1;

  &:hover {
    visibility: visible;
    opacity: 0.5;
    transition: opacity 0.3s, visibility 0.3s;
  }
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InfoContainer = styled.div`
  width: 100%;
  min-width: 50%;
`;
