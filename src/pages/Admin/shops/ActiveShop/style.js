import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
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
