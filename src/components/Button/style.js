import { Button } from "react-bootstrap";
import styled from "styled-components";

export const CustomizeButton = styled.button`
  background-color: ${(props) => props.color};
  padding: 12px;
  color: white;
  border: none;
  opacity: 1;
  &:hover {
    visibility: visible;
    opacity: 0.5;
    transition: opacity 0.3s, visibility 0.3s;
  }
`;
