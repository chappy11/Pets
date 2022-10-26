import React from "react";
import useGetUserFromStorage from "../../hooks/useGetUserFromStorage";
import Customer from "./Customer";
import Shop from "./Shop";

export default function Profiles() {
  const { user } = useGetUserFromStorage();

  if (user?.customer_id) {
    return <Customer user={user} />;
  }

  if (user?.shop_id) {
    return <Shop user={user} />;
  }
}
