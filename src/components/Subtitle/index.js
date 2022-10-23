import React from "react";
import * as S from "./style";
export default function Subtitle(props) {
  return (
    <S.Subtitle color={props?.color ? props?.color : "gray"}>
      {props.children}
    </S.Subtitle>
  );
}
