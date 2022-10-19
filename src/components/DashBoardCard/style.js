import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.color};
  padding: 15px;
  cursor: pointer;
  border-radius: 5px;
`;

export const NumberText = styled.text`
  font-size: 25px;
  color: white;
`;

export const Subtitle = styled.text`
  font-size: 18px;
  color: white;
`;
