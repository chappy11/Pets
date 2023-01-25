import styled from "styled-components";
import { defaultThemes } from "../../../../constants/DefaultThemes";

export const Container = styled.div`
  background: white;
`;

export const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
`;

export const Label = styled.p`
  font-size: 12px;
  color: gray;
`;

export const Message = styled.div`
  align-self: ${(props) => props.alignment};
  margin: 0px 10px;
`;

export const Msg = styled.div`
  background: ${(props) => props.background};
  border-radius: 10px;
`;

export const MsgText = styled.p`
  padding: 10px;

  color: white;
`;

export const Header = styled.div`
  background-color: ${defaultThemes.secondary};
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const TextContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.alignment};
  padding: 10px;
`;
