import React from 'react';
import { TextInput } from '../../../../components';

export default function UpdateStock(props){
    return(
        <>  
            <p>{props.value}</p>
            <TextInput label="Number of Stock" onChange={props?.onChange} />
        </>
    );
}