import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

export const ItemInformation = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

export const Column = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  border: 1px solid lightgray;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: darkgray;
`;

export const StockBox = styled.div`
  border: 1px solid lightgray;
  display: flex;
  width: 100px;
  flex: 1;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LineRow = styled(Row)`
  border-bottom: 1px solid lightgray;
  padding: 10px 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CheckoutContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
