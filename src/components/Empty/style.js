import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Image = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
