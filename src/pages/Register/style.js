import styled from "styled-components";

export const Image = styled.img`
  width: 150px;
  height: 150px;
`;

export const defaultImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: lightgrey;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ResendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding:12px; 0px;
  flex-direction:column;
`;

export const Link = styled.button`
  border: none;
  text-decoration: underline;
  color: blue;
  background-color: transparent;
`;
