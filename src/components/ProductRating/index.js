import React from "react";
import Rating from "react-rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import * as S from './style'
export default function ProductRating({ rate }) {
  
  return (
    <S.Column>  
    <Rating
      initialRating={rate ? parseInt(rate) : 0}
      emptySymbol={<StarBorderIcon />}
      fullSymbol={<StarIcon style={{ color: "yellow" }} />}
      readonly
    />
    <S.TextRating>{parseFloat(rate)} Ratings</S.TextRating>
    </S.Column>

  );
}
