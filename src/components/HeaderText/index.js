import React from 'react'
import * as S from './style';


export default function HeaderText(props){
    return(
        <S.Text>{props.children}</S.Text>
    )
}