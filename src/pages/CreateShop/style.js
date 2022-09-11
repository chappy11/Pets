import styled from 'styled-components';
import { TextInput } from '../../components';

export const Image = styled.img`
    width:200px;
    height:200px;
`;

export const NoImage = styled.div`
    width:150px;
    height:150px;
    background-color:lightgray;
`;

export const ImageContainer = styled.div`
    display:flex;
    flex:1;
    justify-content:center;
    align-items:center;
`;

export const HideInput = styled(TextInput)`
    display:none;
`;