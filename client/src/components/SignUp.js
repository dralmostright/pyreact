import React, {useState} from "react";
import  {Form, Button, Alert} from 'react-bootstrap'
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';

const SignUpPage=()=>{

    const {register,watch,reset,handleSubmit,formState:{errors}} = useForm();
    const[show,setShow]=useState(false)
    const [serverResponse,setServerResponse]=useState('')

    const submitForm=(data)=>{
        
        if(data.password === data.confirmPassword) {
            const body={
                username:data.username,
                email:data.email,
                password:data.password
            }
            const requestOptions={
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(body)
            }
                fetch('/auth/signup',requestOptions)
                .then(res=>res.json())
                .then(data=>{
                    setServerResponse(data.message)
                    console.log(serverResponse)
                    setShow(true)
                })
                .catch(err=>console.log(err))
                reset()
            }
    }

    console.log(watch("username"));
    return(
        <div className="container">
            <div className="form">
            {show?
               <>
                <Alert variant="success" onClose={() => {setShow(false)
                }} dismissible>
                <p>
                   {serverResponse}
                </p>
                </Alert>

                <h1>Sign Up Page</h1>
                
                </>
                :
                <h1>Sign Up Page</h1>
               
               }

                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Your Username" {...register("username",{required:true,maxLength:25})}/>
                    </Form.Group>
                    {errors.username && <span style={{color:"red"}}>Username is required</span>}
                    {errors.username?.type==="maxLength" && <span style={{color:"red"}}>Max characters should 25</span>}
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Your Email" {...register("email",{required:true,maxLength:25})}/>
                    </Form.Group>
                    {errors.email && <span style={{color:"red"}}>password is required</span>}                   
                    <br></br>
                    <Form.Group>
                        <Form.Label>Paaword</Form.Label>
                        <Form.Control type="password" placeholder="Your Password" {...register("password",{required:true,minLength:5})}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Paaword</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password"  {...register("confirmPassword",{required:true,minLength:5})}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>SignUp</Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                    <small>Already have an accout? <Link to='/login'>Login Now! </Link></small>
                </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default SignUpPage