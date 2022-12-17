import { Form } from "react-bootstrap";
import styled from "styled-components";
import { TextInput } from "../../components";
import { defaultThemes } from "../../constants/DefaultThemes";

export const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  background: white;
`;

export const FormCotainer = styled.div`
  padding: 25px;
  background-color: #fefefe;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  font-size: ${(props) => props.size}em;
  font-weight: bold;
  color: ${defaultThemes.secondary};
  text-align: center;
`;

export const InputContainer = styled.div`
  width: 500px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid lightgrey;
  border-radius: 0px;
  width: 100%;
  padding: 12px 10px;
  outline: none;
  background: whitesmoke;
  color: gray;

  &:focus {
    border: none;
    border-bottom: 2px solid ${defaultThemes.secondary};
  }
`;

export const Password = styled.div`
  display: flex;
  background: whitesmoke;
`;
