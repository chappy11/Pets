import styled from "styled-components";

export const ItemContainer = styled.td`
  dipslay: flex;
  justify-content: center;
  align-items: center;
  background: blue;
  height: auto;
`;

export const JustifyEnd = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Item = styled.tr`
  background-color:${props=>props.isReOrder ? '#FFCCCB':''}
`;