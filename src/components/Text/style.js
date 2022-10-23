import styled from "styled-components";

export const Text = styled.p`
  font-size: 18px;
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
`;
