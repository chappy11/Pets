import styled from "styled-components";
import { Button } from "../../components";

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) => props.alignment};
  flex-direction: column;
`;

export const CustomButton = styled(Button)`
  width: 200px;
  color: red;
`;
