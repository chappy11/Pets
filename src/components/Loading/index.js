import React from "react";
import * as S from "./style";
import BeatLoader from "react-spinners/HashLoader";
import { defaultThemes } from "../../constants/DefaultThemes";
import HeaderText from "../HeaderText";
import SizeBox from "../SizeBox";

export default function Loading(props) {
  return (
    <>
      {props.isLoading && (
        <S.DarkBackground>
          {" "}
          <BeatLoader
            color={defaultThemes.color001}
            loading={true}
            size={100}
          />
          <SizeBox height={20} />
          <S.Text>Loading ...</S.Text>
        </S.DarkBackground>
      )}
    </>
  );
}
