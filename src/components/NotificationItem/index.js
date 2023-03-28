import React, { useMemo } from "react";
import SizeBox from "../SizeBox";
import * as S from "./style";

export default function NotificationItem({
  header,
  message,
  onClick,
  isRead,
  date,
}) {
  const status = useMemo(() => {
    return isRead === "0" ? "UnRead" : "Read";
  }, [isRead]);
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
      <SizeBox height={10} />
      <S.NotifStatus>{status}</S.NotifStatus>
    </S.ListItem>
  );
}
