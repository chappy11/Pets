import { defaultThemes } from "../../constants/DefaultThemes";
import * as S from "./style";

export default function Button(props) {
  return (
    <S.CustomizeButton
      color={props?.color ? props.color : defaultThemes.color001}
      onClick={() => props?.onClick()}
    >
      {props.children}
    </S.CustomizeButton>
  );
}
