import styled from "styled-components";

export const Image = styled.img`
  height: ${(props) => props?.width}px;
  width: ${(props) => props?.height}px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Info = styled.div`
  width: 500px;
`;
