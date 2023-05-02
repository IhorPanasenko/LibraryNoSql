import styles from './UpdatePage.css'

import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const URL = "https://localhost:7054/api/Book/Update";
const URL_GETBOOK = "https://localhost:7054/api/Book/getById?bookId="

function UpdatePage() {

    const navigate = useNavigate();
    const userRef = useRef();

    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(0);
    const [author, setAuthor] = useState('');
    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(()=>{
        getBook();
    }, [])

    function getBook(){
        const response = axios({
            method: "get",
            url: URL_GETBOOK + id,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setBook(response.data)
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                Id: id,
                title: title,
                pages: pages,
                author: author
            }

            await axios({
                method: 'put',
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
                                        placeholder={book?.title}
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
                                        placeholder={book?.pages}
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
                                        placeholder={book.author}
                                        required
                                        style={{"font-size":30+"px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Button_Wrapper">
                        <button>Update</button>
                    </div>
                </form>
            </section>
        </div >
    )
}

export default UpdatePage
