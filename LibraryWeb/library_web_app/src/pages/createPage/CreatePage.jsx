import styles from './CreatePage.css'

import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const URL = "https://localhost:7054/api/Book/insert";

function CreatePage() {

    const navigate = useNavigate();
    const userRef = useRef();

    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(0);
    const[author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                title: title,
                pages: pages,
                author: author
            }

            await axios({
                method: 'post',
                url: URL,
                data: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }).then((response)=>{
                
                navigate("/Home")
            })

        } catch (err) {
            if (!err?.response) {
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
                                    <label htmlFor='username'>Title:</label>
                                </div>
                                <div class="Input_Input">
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        style={{"font-size":30+"px"}}
                                    />
                                </div>
                            </div>
                            <div class="Input_Blocks">
                                <div class="Input_Label">
                                    <label htmlFor='password'>Pages:</label>
                                </div>
                                <div class="Input_Input">
                                    <input
                                        type= "number"
                                        id="password"
                                        onChange={(e) => setPages(e.target.value)}
                                        value={pages}
                                        required
                                        style={{"font-size":30+"px"}}
                                    />
                                </div>
                            </div>
                            <div class="Input_Blocks">
                                <div class="Input_Label">
                                    <label htmlFor='password'>Author:</label>
                                </div>
                                <div class="Input_Input">
                                    <input
                                        type= "text"
                                        id="password"
                                        onChange={(e) => setAuthor(e.target.value)}
                                        value={author}
                                        required
                                        style={{"font-size":30+"px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Button_Wrapper">
                        <button>Create</button>
                    </div>
                </form>
            </section>
        </div >
    )
}

export default CreatePage
