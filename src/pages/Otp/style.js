import styled from "styled-components";
import { Form } from "react-bootstrap";
export const Customize = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 500px;
  width: 500px;
  background: white;
  padding: 30px;
`;

export const Input = styled(Form.Control)`
  text-align: center;
`;
