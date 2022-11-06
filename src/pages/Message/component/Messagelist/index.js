import React, { useMemo, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { HeaderText, Text } from "../../../../components";
import * as S from "./style";
import useGetAllReciever from "../../../../hooks/useGetAllReciever";
import { BASE_URL } from "../../../../services/ApiClient";
import { ListItemButton } from "@mui/material";
export default function MessageList(props) {
  const { data } = useGetAllReciever();

  const display = useMemo(() => {
    return data.map((val, i) => (
      <>
        <ListItemButton
          selected={props.reciever_id === val.reciever_id}
          alignItems="flex-start"
          onClick={() => (window.location.href = "/message/" + val.reciever_id)}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={
                val.shop_id ? BASE_URL + val.logo : BASE_URL + val.profilePic
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              val.shop_id
                ? val.shopName
                : val.firstName + "" + val.middleName + "" + val.lastName
            }
            secondary={<React.Fragment>{val.message}</React.Fragment>}
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
      </>
    ));
  }, [data]);

  return (
    <S.Container>
      <HeaderText>Chat</HeaderText>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {display}
      </List>
    </S.Container>
  );
}
