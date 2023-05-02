//import styles from './HomePage.css'

import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Switch from "./Switch";

const URL_GETBOOKS = "https://localhost:7054/api/Book/getAll";
const URL_GETUSERS = "https://localhost:7054/api/User/getAll";
const URL_DELETEBOOK = "https://localhost:7054/api/Book/deleteById?bookId="
const URL_UPDATEUSER = "https://localhost:7054/api/User/Update"

function HomePage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [isRendered, setIsRendered] = useState(false);
    const [value, setValue] = useState(false);

    async function setAdmin(id, role2) {
        let role1 = role2 == "User" ? "Admin" : "User";
        console.log("user id: " + id + "\n user new role: " + role1)
        let body = {
            Id: id,
            Role: role1
        }

        await axios({
            method: 'put',
            url: URL_UPDATEUSER,
            data: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then((response) => {
            console.log(response.data)
            getAllUsers()
        })


    }
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
    async function getAllUsers() {
        const response = await axios({
            method: "get",
            url: URL_GETUSERS,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setUsers(response.data)
        })
    }

    useEffect(() => {
        getAllBooks()
        getAllUsers()
        setIsRendered(true)
    }, [])

    function editBook(id) {
        navigate('/UpdatePage/' + id);
    }

    function deleteBook(id) {
        const response = axios({
            method: "delete",
            url: URL_DELETEBOOK + id,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setBooks(getAllBooks())
        })
    }

    function create() {
        navigate('/CreateBook')
    }

    if (isRendered) {
        return (
            <>
                <main className='main'>
                    <div className="form_block" id='form_block'>
                        <div className="user_head_container" style={{ padding: 30 }}>
                            <h1>Books</h1>
                        </div>
                        <div className="m-3">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr className='table_row'>
                                        <th className='table_cell'>Title</th>
                                        <th className='table_cell'>Pages</th>
                                        <th className='table_cell'>Author</th>
                                        <th className='table_cell'>Given to</th>
                                        <th className='table_cell'>Edit</th>
                                        <th className='table_cell'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books?.slice().reverse().map((item) => (
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
                                                <div className="nick_name">
                                                    <p>{item.givenToUserId} </p>
                                                </div>
                                            </td>
                                            <td className="table_cell">
                                                <button className='view_button' onClick={() => editBook(item.id)}>Edit</button>
                                            </td>
                                            <td className="table_cell">
                                                <button className='delete_button' onClick={() => {
                                                    deleteBook(item.id)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="button_wrapper" style={{ padding: 30 }}>
                            <button className='create_button' onClick={() => {
                                create()
                            }}>Create</button>
                        </div>
                        <div className="user_head_container" style={{ padding: 30 }}>
                            <h1>Users</h1>
                        </div>
                        <div className="m-3">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr className='table_row'>
                                        <th className='table_cell'>Login</th>
                                        <th className='table_cell'>Role</th>
                                        <th className='table_cell'>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.reverse().map((item) => (
                                        <tr className='table_row' key={item.id}>
                                            <td className="table_cell">
                                                <div className="nick_name">
                                                    <p>{item.login} </p>
                                                </div>
                                            </td>
                                            <td className="table_cell">
                                                <div className="nick_name">
                                                    <p>{item.role} </p>
                                                </div>
                                            </td>
                                            <td className="table_cell m-2">
                                            {/* onClick={() => setAdmin(item.id, item.role)} */}
                                                <div className="nick_name">
                                                    <Switch
                                                        isOn={item.role == "Admin"}
                                                        onColor="#EF476F"
                                                        id={item.id}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </main>
            </>
        )
    }
    else {
        return <h1>Please Wait</h1>
    }
}

export default HomePage
