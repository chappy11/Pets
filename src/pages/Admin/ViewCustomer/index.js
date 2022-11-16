import React from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ViewUser from "../../../components/ViewUser";
import useGetUserData from "../../../hooks/useGetUserData";
import Sidebar from "../component/Sidebar";

export default function ViewCustomer() {
  const { id } = useParams();
  const { data } = useGetUserData({ id: id, type: "customer" });

  const customData = useMemo(() => {
    const newData = { isShop: false, ...data };
    return newData;
  }, [data]);

  return (
    <Sidebar>
      <ViewUser data={customData} />
    </Sidebar>
  );
}
