import React from 'react';
import {Form} from 'react-bootstrap';

export default function TextInput(props){
    return(
        <>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control placeholder={props.placeholder} name={props.name} onChange={props.onChange} value={props.value} type={props.type} disabled={props.disabled} className="input-sm"/>
        </>
    );
}