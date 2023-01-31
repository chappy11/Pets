import React from "react";
import SizeBox from "../SizeBox";
import * as S from "./style";

export default function NotificationItem({
  header,
  message,
  onClick,
  isRead,
  date,
}) {
  return (
    <S.ListItem
      color={isRead === "0" ? "whitesmoke" : "white"}
      onClick={() => onClick()}
    >
      <SizeBox height={10} />
      <S.Header>{header}</S.Header>
      <S.Date>{date}</S.Date>
      <SizeBox height={10} />
      <p>{message}</p>
    </S.ListItem>
  );
}
