import Button from 'react-bootstrap/Button';
import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import Table from 'react-bootstrap/Table';
import jwtDecode from 'jwt-decode';

const URL_BOOKS_BY_USER_ID = "https://localhost:7054/api/Book/getByUser?userId=";
const URL_RETRIEVE_BOOK = "https://localhost:7054/api/Book/retrieve?bookId=";
const URL_GET_USER = "https://localhost:7054/api/User/GetById?id=";

function UserProfile() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const [isRendered, setIsRendered] = useState(false);

    async function getUserBooks() {
        var token = localStorage.getItem("token");
        var decodedToken = jwtDecode(token);

        const response = await axios({
            method: "get",
            url: URL_BOOKS_BY_USER_ID + decodedToken.Id,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setBooks(response.data)
        })
    }

    function getUser() {
        var token = localStorage.getItem("token");
        var decodedToken = jwtDecode(token);

        const response = axios({
            method: "get",
            url: URL_GET_USER + decodedToken.Id,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setUser(response.data)
        })
    }

    useEffect(() => {
        getUserBooks()
        getUser()
        setIsRendered(true)
    }, [])

    function RetriveBook(bookId) {
        try {
            axios({
                method: 'put',
                url: URL_RETRIEVE_BOOK + bookId,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }).then((response) => {
                navigate("/UserProfile")
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

    function editProfileClick(){
        navigate("/EditProfile")
    }

    if (isRendered) {
        return (
            <>
                <UserHeader />
                <div className="m-4 bg-light">
                    <section className="userinfo bg-info m-4 p-3 border border-primary rounded dotted fz-30">
                        <p>Hello, {user.login}</p>
                        <p>You are, {user.role}</p>
                        <p>You can find your books in this section:</p>
                        <div className="d-flex justify-content-center">
                            <Button variant="dark" onClick={()=>{
                                editProfileClick()
                            }}>Edit Profile</Button>
                        </div>
                    </section>
                    <div className="m-3">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr className='table_row'>
                                    <th className='table_cell'>Title</th>
                                    <th className='table_cell'>Pages</th>
                                    <th className='table_cell'>Author</th>
                                    <th className='table_cell'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {books?.reverse().map((item) => (
                                    <tr className='table_row' key={item.id}>
                                        <td className="table_cell">
                                            <div className="nick_name">
                                                <p>{item.title} </p>
                                            </div>
                                        </td>
                                        <td className="table_cell">
                                            <div className="nick_name">
                                                <p>{item.pages} </p>
                                            </div>
                                        </td>
                                        <td className="table_cell">
                                            <div className="nick_name">
                                                <p>{item.author} </p>
                                            </div>
                                        </td>
                                        <td className="table_cell">
                                            <Button variant="info" onClick={() => RetriveBook(item.id)}>Return</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

            </>
        )
    }
    else {
        return <h1>Please Wait</h1>
    }

}

export default UserProfile
