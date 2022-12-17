import styled from "styled-components";

export const NameContainer = styled.div`
  display: flex;
`;

export const Headers = styled.div`
  display: flex;
`;

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props?.justification ? props.justification : "flex-start"};
`;
