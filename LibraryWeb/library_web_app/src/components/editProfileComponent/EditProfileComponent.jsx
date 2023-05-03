import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const URL_UPDATEUSER = "https://localhost:7054/api/User/Update"

function EditProfileComponent() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    var token = localStorage.getItem("token");
    var decodedToken = jwtDecode(token);
    console.log(decodedToken);
    var id = decodedToken.Id;

    async function update(e) {
        e.preventDefault()
        let body = {
            Id: id,
            login: login,
            password: password
        }

        console.log(body);
        await axios({
            method: 'put',
            url: URL_UPDATEUSER,
            data: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then((response) => {
            console.log(response.data)
            navigate("/UserProfile");
        })
    }

    return (
        <div className="m-5">
            <h2>Enter new User Name and password</h2>
            <Form className=' p-3 border border-dark m-3 bg-info'>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label>Login (User Name)</Form.Label>
                    <Form.Control type="text" placeholder="Login" onChange={(e)=>setLogin(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => update(e)}>
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default EditProfileComponent
