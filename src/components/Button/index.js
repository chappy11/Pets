import React, { useMemo } from "react";
import { defaultThemes } from "../../constants/DefaultThemes";
import * as S from "./style";
import ClipLoader from "react-spinners/ClipLoader";

export default function Button(props) {
  const color = useMemo(() => {
    if (props?.disabled) {
      return defaultThemes?.grey;
    }

    if (props?.color) {
      return props?.color;
    }

    return defaultThemes.color001;
  }, [props?.color, props?.disabled]);

  return (
    <S.CustomizeButton
      color={color}
      onClick={() => props?.onClick()}
      disabled={props?.disabled}
    >
      {props.isLoading && (
        <ClipLoader color={props.color} loading={props.isLoading} />
      )}

      {props.children}
    </S.CustomizeButton>
  );
}
