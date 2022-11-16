import { Form } from "react-bootstrap";
import styled from "styled-components";

export const CustomContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
`;

export const FieldContainer = styled.div`
  height: 500px;
  width: 600px;
  background-color: white;
  padding: 30px;
`;

export const OTPContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled(Form.Control)`
  width: 300px;
  text-align: center;
`;
