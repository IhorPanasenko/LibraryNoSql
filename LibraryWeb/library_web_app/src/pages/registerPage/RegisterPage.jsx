import styles from './RegisterPage.css'
import Background from './img/backgroundLogin.jpg';
import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const URL = "https://localhost:7054/api/User/register";

function RegisterPage() {
        
    const navigate = useNavigate();
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                login: user,
                password: pwd
            }

            await axios({
                method: 'post',
                url: URL,
                data: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }).then((response)=>{
                console.log(response.data);
                alert("You have registered");
                navigate("/Login")
            })

        } catch (err) {
            if (!err?.response) {
                //alert("No Server Response");
                console.log(err);
            } else if (err.response?.status === 400) {
                alert("Missing Password or Login");
            } else if (err.response?.status === 401) {
                alert("Unathorized")
            } else {
                alert("Registration failed");
            }
        }
    }

    return (
        <div class="Some_Wrapper" >
            <section className='sectionn'>
                <form onSubmit={handleSubmit} method="Post">
                    <div className="Form_Input_Area_Wrapper">
                        <div class="Auth_Input_Wrap">
                            <div class="Input_Blocks First_Input_Block">
                                <div class="Input_Labell">
                                    <label htmlFor='username'>Username:</label>
                                </div>
                                <div class="Input_Input">
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                        style={{"font-size":30+"px"}}
                                    />
                                </div>
                            </div>
                            <div class="Input_Blocks">
                                <div class="Input_Labell">
                                    <label htmlFor='password'>Password:</label>
                                </div>
                                <div class="Input_Input">
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        style={{"font-size":30+"px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Button_Wrapper">
                        <button>Register</button>
                    </div>

                </form>
            </section>
        </div>
    )
}

export default RegisterPage
