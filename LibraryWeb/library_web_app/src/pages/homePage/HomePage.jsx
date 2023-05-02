import styles from './HomePage.css'

import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const URL_GETBOOKS = "https://localhost:7054/api/Book/getAll";
const URL_DELETEBOOK = "https://localhost:7054/api/Book/deleteById?bookId="

function HomePage() {
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

    function editBook(id) {
        navigate('/UpdatePage/'+id);
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
                        <div className="user_head_container">
                            <h1>Books</h1>
                        </div>
                        <table className='table_admin'>
                            <tr className='table_row'>
                                <th className='table_cell'>Title</th>
                                <th className='table_cell'>Pages</th>
                                <th className='table_cell'>Author</th>
                                <th className='table_cell'>Given to</th>
                                <th className='table_cell'>Edit</th>
                                <th className='table_cell'>Delete</th>
                            </tr>
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
                                            <p>{item.givenTo} </p>
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
                        </table>
                        <div className="button_wrapper">
                            <button className='create_button' onClick={() => {
                                create()
                            }}>Create</button>
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
