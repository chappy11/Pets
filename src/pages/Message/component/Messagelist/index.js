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
  const { data,isCustomer } = useGetAllReciever();

  const display = useMemo(() => {
    return data?.map((val, i) =>{ 
      const logo = isCustomer ?   val.logo : val.profilePic;
      const name = isCustomer ?  val.shopName :  val.firstname+" "+val.middlename+" "+val.lastname;

   
      return(
      <>
        <ListItemButton
           selected={props.conn_id === val.conn_id}
          alignItems="flex-start"
          onClick={() => (window.location.href = "/message/" + val.conn_id)}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={logo}
            />
          </ListItemAvatar>
          <ListItemText
            primary={name}
           // secondary={<React.Fragment>{val.message}</React.Fragment>}
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
      </>
    )});
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
