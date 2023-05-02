import styles from './LoginPage.css'

import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const URL = "https://localhost:7054/api/User/login";

function LoginPage() {
        
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
                console.log(response.data.jwt);
                var token = response.data.jwt;
                var decodedToken = jwtDecode(token);
                console.log(decodedToken);
                localStorage.setItem("token", token);
                
                // if(decodedToken.role == "Admin"){
                //     navigate("/AdminViewUsers");
                //     return;
                // }
                
                navigate("/Home")
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
                alert("Login failed");
            }
        }
    }

    return (
        <div class="Auth_Wrapper">
            <section className='section'>
                <form onSubmit={handleSubmit} method="Post">
                    <div className="Form_Input_Area_Wrapper">
                        <div class="Auth_Input_Wrap">
                            <div class="Input_Blocks First_Input_Block">
                                <div class="Input_Label">
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
                                <div class="Input_Label">
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
                        <button>Log In</button>
                    </div>

                </form>
                <div class="Registration_Link">
                    <p>
                        No account yet?&nbsp;&nbsp;
                        <Link to="/Register">
                            <span className="line">Register</span>
                        </Link>
                    </p>
                </div>
            </section>
        </div >
    )
}

export default LoginPage
