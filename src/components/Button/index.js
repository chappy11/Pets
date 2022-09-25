import { defaultThemes } from "../../constants/DefaultThemes";
import * as S from "./style";
import ClipLoader from "react-spinners/ClipLoader";
export default function Button(props) {
  return (
    <S.CustomizeButton
      color={props?.color ? props.color : defaultThemes.color001}
      onClick={() => props?.onClick()}
    >
      {props.isLoading && (
        <ClipLoader color={props.color} loading={props.isLoading} />
      )}

      {props.children}
    </S.CustomizeButton>
  );
}
