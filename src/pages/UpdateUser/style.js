import styled from "styled-components";
import { Container, Form } from "react-bootstrap";

export const CustomeContainer = styled(Container)`
  width: 800px;
  background-color: white;
`;
export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfilePic = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100px;
`;

export const TextInputFile = styled(Form.Control)`
  width: 300px;
`;

export const TitleContainer = styled.div`
  padding: 0 40px;
  width: 100%;
`;

export const TextInputContainer = styled.div`
  width: 300px;
`;
