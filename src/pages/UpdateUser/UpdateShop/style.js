import { Container } from "react-bootstrap";
import styled from "styled-components";

export const CustomCustomize = styled(Container)`
  width: 600px;
  background-color: white;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Image = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100px;
`;

export const TextInputContainer = styled.div`
  width: 350px;
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: 0 15px;
`;
