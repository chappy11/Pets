import { SizeBox, TextInput,  } from '../../components';
import * as S from './style';
import {Button} from 'react-bootstrap';
import { useState } from 'react';
import { User } from '../../services/User';
import swal from 'sweetalert';
import { KEY, save } from '../../utils/storage';


export default function Login(){
    const [account,setAccount] = useState({
        username:"",
        password:""
    })

    const onChange = (e) =>{
        setAccount({...account,[e.target.name]:e.target.value});
    }

  
    const handleLogin  = async() =>{
        
        if(account.username === "" || account.password === ""){
            swal("Warning","Fill out all fields");
        }else{
            const response =  await User.login(account);
            console.log(response.data);
            if(response.data.status == 1){
               localStorage.setItem("Account",JSON.stringify(response.data.data));
                if(response.data.data.user_roles === "1"){
                    console.log("SHOP")
                  
                    swal("Success",response?.data.message,"success").then(res=>{
                      
                         window.location.href="http://localhost:3000/myshop";
                      })
                  }else if(response.data.data.user_roles === "2"){
                    console.log("user ")
                    swal("Success",response?.data.message,"success").then(res=>{
                     
                     window.location.href="http://localhost:3000";
                })
            }else if(response.data.data.user_roles == 0){
                swal("Success",response?.data.message,"success").then(res=>{
                   window.location.href="http://localhost:3000/admin";
              })
            }
           
        }else{
            swal("Error",response.data.message,'error');
        }
       
    }
}

    return(
       <S.Container>
            <S.FormCotainer>
                <h3>Login</h3>
                <SizeBox height={15}/>
                <TextInput name="username" placeholder='Enter Username' label='Username' type='text' onChange={onChange}/>
                <SizeBox height={15}/>
                <TextInput name="password" placeholder='Enter Password' label='Password' type='password' onChange={onChange}/>
                <SizeBox height={20}/>
                <Button onClick={()=>handleLogin()}>Login</Button>
            </S.FormCotainer>
       </S.Container>
    );
}