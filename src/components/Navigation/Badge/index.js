import React from "react";
import { Badge } from "react-bootstrap";

export default function CustomBadge(props) {
  const { value } = props;
  return <Badge bg="primary">{value}</Badge>;
}
