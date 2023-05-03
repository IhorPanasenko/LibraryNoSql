import styles from './UserHomePage.css'
import Button from 'react-bootstrap/Button';
import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import Table from 'react-bootstrap/Table';
import jwtDecode from 'jwt-decode';

const URL_GETBOOKS = "https://localhost:7054/api/Book/getAll";
const URL_TAKEBOOK = "https://localhost:7054/api/Book/give"

function UserHomePage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [isRendered, setIsRendered] = useState(false);

    async function getAllBooks() {
        const response = await axios({
            method: "get",
            url: URL_GETBOOKS,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setBooks(response.data)
        })
    }

    useEffect(() => {
        getAllBooks()
        setIsRendered(true)
    }, [])

    function TakeBook(bookId) {
        try {
            var token = localStorage.getItem("token");
            console.log(token);
            var decodedToken = jwtDecode(token);
            console.log(decodedToken);

            let body = {
                bookId: bookId,
                userId: decodedToken.Id,
            }

            axios({
                method: 'put',
                url: URL_TAKEBOOK,
                data: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }).then((response) => {
                getAllBooks();
                navigate("/UserHome");
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

    function MyProfile() {
        navigate('/UserProfile')
    }

    if (isRendered) {
        return (
            <>
                <UserHeader />
                <div className="m-4 bg-light">
                    <main className='main'>
                        <div className="form_block" id='form_block'>
                            <div className="user_head_container">
                                <h1>Available for reading Books</h1>
                            </div>
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
                                        {books?.reverse().filter(item =>  item.givenToUserId === null ||  item.givenToUserId === "00000000-0000-0000-0000-000000000000").map((item) => (
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
                                                    <Button variant="info" onClick={() => TakeBook(item.id)}>Take</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            {/* <div className="button_wrapper">
                            <button className='create_button' onClick={() => {
                                create()
                            }}>Create</button>
                        </div> */}
                        </div>
                    </main>
                </div>
            </>
        )
    }
    else {
        return <h1>Please Wait</h1>
    }
}

export default UserHomePage
