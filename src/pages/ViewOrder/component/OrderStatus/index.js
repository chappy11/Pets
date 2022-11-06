import React from "react";
import { useMemo } from "react";
import { Text } from "../../../../components";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { defaultThemes } from "../../../../constants/DefaultThemes";
export default function OrderStatus(props) {
  const displayStatus = useMemo(() => {
    if (props?.status === "0") {
      return (
        <Text>
          <WarningAmberIcon /> Pending
        </Text>
      );
    }

    if (props?.status === "1") {
      return (
        <Text>
          <SwipeRightIcon /> Accepted
        </Text>
      );
    }

    if (props?.status === "2") {
      return (
        <Text>
          <DepartureBoardIcon /> Ready for Delivery
        </Text>
      );
    }

    if (props?.status === "3") {
      return (
        <Text color={defaultThemes.secondary}>
          <LocalShippingIcon /> Out for delivery
        </Text>
      );
    }

    if (props?.status === "5") {
      return (
        <Text color="#4BB543">
          <ThumbUpAltIcon /> Received Order
        </Text>
      );
    }

    if (props?.status === "4") {
      return <Text color="red">Cancel Order</Text>;
    }
  }, [props?.status]);

  return <>{displayStatus}</>;
}
