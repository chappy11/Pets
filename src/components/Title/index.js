import React from "react";
import * as S from "./style";
export default function Title(props) {
  return <S.Title color={props.color}>{props.children}</S.Title>;
}
