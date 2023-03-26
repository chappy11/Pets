import styled from "styled-components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const VoucherCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 200px;
  color: ${(props) => (props.isSelected ? "black" : "white")};
  background: ${(props) =>
    props.isSelected ? "whitesmoke" : defaultThemes.color001};
  margin: 5px;
`;

export const MyLabel = styled.div`
  font-weight: bold;
`;

export const Total = styled.div`
  font-weight: bold;
  font-size: 18px;
`;
