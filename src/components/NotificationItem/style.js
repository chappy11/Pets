import styled from "styled-components";

export const ListItem = styled.div`
  width: 100%;
  background-color: ${(props) => props.color};
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;

export const Header = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

export const Date = styled.p`
  font-size: 10px;
`;
