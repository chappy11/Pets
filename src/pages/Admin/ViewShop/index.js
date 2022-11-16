import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import ViewUser from "../../../components/ViewUser";
import useGetUserData from "../../../hooks/useGetUserData";
import Sidebar from "../component/Sidebar";

export default function ViewShop() {
  const { id } = useParams();
  const { data } = useGetUserData({ id: id, type: "shop" });

  const shopData = useMemo(() => {
    const newData = { ...data, isShop: true };
    return newData;
  }, [data]);

  return (
    <Sidebar>
      <ViewUser data={shopData} />
    </Sidebar>
  );
}
