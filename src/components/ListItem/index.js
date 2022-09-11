import React from "react";
import { Stack } from "react-bootstrap";
import * as S from "./style";
export default function ListItem(props) {
  return (
    <Stack direction="horizontal" gap={2}>
      <S.Label>{props.label}</S.Label>
      <S.Value>{props.value}</S.Value>
    </Stack>
  );
}
