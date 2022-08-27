import React, { useState } from 'react';
import {Row,Container,Col,Button} from 'react-bootstrap';
import { SizeBox, TextInput } from '../../components';
import swal from 'sweetalert';
import * as S from './style';
import { User } from '../../services/User';
export default function CreateShop(){
    const [img,setImg] = useState(null);
    const [user,setUser] = useState({
        username:"",
        password:"",
        cpassword:"",
        email:"",
        contact:"",
        firstname:"",
        middlename:"",
        lastname:"",
        name:"",
        description:"",
        address:"",
    })

    const [shop,setShop] = useState({});
    const onImageChange = (e) =>{
        setImg(e.target.files[0])
    }

    const onChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    async function handleSubmit(){
        console.log(user);
         if(user.username==="" || user.password === "" || user.cpassword === "" || user.email === "" || user.contact === "" || user.firstname === "" || user.middlename === "" || user.lastname === "" || user.name === "" || user.description === "" || user.address === ""){
            swal("Warning","Fill out all fields");
        }else if(user.password!== user.cpassword){
            swal("Warning","Password do not match")
        }else{
            
            const formdata = new FormData();
            formdata.append('username',user.username);
            formdata.append('password',user.password);
            formdata.append('firstname',user.firstname);
            formdata.append('middlename',user.middlename);
            formdata.append('lastname',user.lastname);
            formdata.append('shopDescription',user.description);
            formdata.append('shopName',user.name);
            formdata.append('address',user.address);
            formdata.append('shopEmail',user.email);
            formdata.append('contact',user.contact);
            formdata.append('shopLogo',img)

            const response = await User.createshop(formdata)
            console.log("WEW",response)
            if(response.data.status == 1){
                swal("Success",response.data.message,'success').then((val)=>{
                    window.location.href="/login"
                });
            }else{
                swal("Error",response.data.message,'error');
            }
        }
    }

    return(
        <Container>
            <Row>
                <Col lg='3'>
                    {img &&
                        <S.Image src={URL.createObjectURL(img)} alt='LOGO'/>
                    }
                    <SizeBox height={15}/>
                    <TextInput type='file' name='img' label="Logo" onChange={onImageChange}/>
                </Col>
                <Col>
                <h3>Account Details</h3>
                    <SizeBox height={20}/>
                    <TextInput name="username" placeholder='Enter username' label='Username' onChange={onChange}/>
                    <SizeBox height={10}/>
                    <TextInput name="password" placeholder='Enter password' label='Password' onChange={onChange}/>
                    <SizeBox height={10}/>
                    <TextInput name="cpassword" placeholder='Confirm Password' label='Confirm Password' onChange={onChange}/>
                    <SizeBox height={10}/>
                    <TextInput name="email" placeholder='Enter email' label='Email' onChange={onChange}/>
                    <SizeBox height={10}/>
                    <TextInput name="contact" placeholder='Enter contact number' label='Contact Number' onChange={onChange}/>
                    <SizeBox height={15}/>
                <h3>Shop Details</h3>
                <TextInput name="name" placeholder='Enter shop name' label='Shop Name' onChange={onChange}/>
                    <SizeBox height={10}/>
                    <TextInput name="description" placeholder='Enter shop description' label='Shop Description' onChange={onChange}/>
                    <SizeBox height={15}/>
                    <h3>Personal Information</h3>
                    <SizeBox height={20}/>
                    <Row>
                        <Col>
                            <TextInput name="firstname" placeholder="Enter firstname" label="Firstname" onChange={onChange}/>
                        </Col>
                        <Col>
                            <TextInput name="middlename" placeholder="Enter middlename" label="Middlename" onChange={onChange}/>
                        </Col>
                        <Col>
                            <TextInput name="lastname" placeholder="Enter lastname" label="Lastname" onChange={onChange}/>
                        </Col>
                    </Row>
                    <SizeBox height={10}/>
                    <TextInput name="address" label="Address" placeholder="St. Brgy City" onChange={onChange}/>
                    <SizeBox height={15}/>
                    <Button onClick={handleSubmit}>Register</Button>
                </Col>
            </Row>
        </Container>
    );
}