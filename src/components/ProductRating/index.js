import React from "react";
import Rating from "react-rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function ProductRating({ rate }) {
  console.log("RARW", rate);
  return (
    <Rating
      initialRating={rate ? parseInt(rate) : 0}
      emptySymbol={<StarBorderIcon />}
      fullSymbol={<StarIcon style={{ color: "yellow" }} />}
      readonly
    />
  );
}
