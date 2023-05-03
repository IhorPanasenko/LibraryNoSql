import React, { useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const URL_GET_BOOK = "https://localhost:7054/api/Book/getById?bookId=";
const URL_GET_USER = "https://localhost:7054/api/User/GetById?id=";
const URL_DELETEBOOK = "https://localhost:7054/api/Book/deleteById?bookId="

function BookLineComponent({ id }) {
    const [book, setBook] = useState();
    const [user, setUser] = useState()
    const navigate = useNavigate();
    var pTeg;

    async function getBook(id) {
        const response = await axios({
            method: "get",
            url: URL_GET_BOOK + id,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setBook(response.data)
        })
    }

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
            console.log(response.data);
            window.location.reload(false);
        })
    }

    async function getUser(userId) {
        const response = await axios({
            method: "get",
            url: URL_GET_USER + userId,
            data: JSON.stringify(),
            headers: { "Content-Type": "application/json; charset=utf-8" },
        }).then((response) => {
            console.log(response.data)
            setUser(response.data)
        })
    }


    useEffect(() => {
        getBook(id);
    }, [])

    if (book?.givenToUserId != null && book?.givenToUserId !== "AAAAAAAAAAAAAAAAAAAAAA==") {
        getUser(book?.givenToUserId);
        pTeg = <p>{user?.login}</p>
    }
    else{
        pTeg = <p>Book is not taken now</p>
    }

    return (
        <tr className='table_row'>
            <td className="table_cell">
                <div className="nick_name">
                    <p>{book?.title} </p>
                </div>
            </td>
            <td className="table_cell">
                <div className="nick_name">
                    <p>{book?.pages} </p>
                </div>
            </td>
            <td className="table_cell">
                <div className="nick_name">
                    <p>{book?.author} </p>
                </div>
            </td>
            <td className="table_cell">
                <div className="nick_name">
                    {pTeg}
                   
                </div>
            </td>
            <td className="table_cell">
                <Button variant="warning" onClick={() => editBook(book.id)}>Edit</Button>
            </td>
            <td className="table_cell">
                <Button variant="danger" onClick={() => { deleteBook(book.id) }}>Delete</Button>
            </td>
        </tr>
    )
}

export default BookLineComponent
