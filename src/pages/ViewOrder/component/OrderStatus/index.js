import React from "react";
import { useMemo } from "react";
import ListItem from "../../../../components/ListItem";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function OrderStatus(props) {
  const displayStatus = useMemo(() => {
    if (props?.status === "0") {
      return <ListItem label="Pending" value={<WarningAmberIcon />} />;
    }

    if (props?.status === "1") {
      return <ListItem label="Accepted" value={<SwipeRightIcon />} />;
    }

    if (props?.status === "2") {
      return (
        <ListItem label="Ready for Delivery" value={<DepartureBoardIcon />} />
      );
    }

    if (props?.status === "3") {
      return (
        <ListItem label="Out for delivery" value={<LocalShippingIcon />} />
      );
    }
  }, [props]);

  return <>{displayStatus}</>;
}
