import * as S from './style';
export default function Container(props){
    return(
        <S.CustomContainer>
            {props.children}
        </S.CustomContainer>
    );
}