import React, { Component, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import KafkaDeletions from '../kafkaComponents/KafkaDeletions';
import { render } from '@testing-library/react';


const Books = () => {
    const [books, setBooks] = useState([]);

    //new book names
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [publisher, setPublisher] = useState('');
    const [id, setId] = useState(0);
    const [authorId, setAuthorId] = useState(0);


    useEffect(() => {

        getBooks();

    }, [])


    function getBooks() {
        axios.get("http://localhost:8080/api/v1/book/")
            .then(res => {
                const newBooks = res.data
                setBooks(newBooks);
            })
    }


    function addNewBook() {
        axios.post('http://localhost:8080/api/v1/book/', {
            "title": title,
            "isbn": isbn,
            "pageNumber": pageNumber,
            "publisher": publisher
        }).then(getBooks());

    }

    function updateBook(id) {

        axios.put(`http://localhost:8080/api/v1/book/` + id + '/?' + 'isbn=' + isbn + '&' + 'title=' + title + '&' + 'pageNumber=' + pageNumber + '&' + 'publisher=' + publisher)
            .then(res => {
                //callback
                getBooks();
            })
    }

    function connectAuthor(bookId, authorId) {
        axios.put(`http://localhost:8080/api/v1/book/` + bookId + '/author/' + authorId)
            .then(res => {
                //callback
                getBooks();
            })
    }

    function deleteBook(id) {

        axios.delete("http://localhost:8080/api/v1/book/" + id)
        getBooks();

    }



    return (
        <div id="card" style={{backgroundColor:'yellow'}}>
            <h1>Book List</h1>
            <table border={3} style={{ fontSize: 10,  }}>
                <tbody>
                    <tr>
                        <td >ID</td>
                        <td>Authors</td>
                        <td>ISBN</td>
                        <td>Title</td>
                        <td>Publisher</td>
                        <td>Page Number</td>
                        <td>Delete?</td>
                    </tr>
                    {
                        books.map((item, i) =>
                            <tr key={i}>
                                <td>{item.id}</td>

                                <td> {item.authors.length <= 0 ? <td>no author info</td> :
                                    <td> {item.authors.map((author, index) => {
                                        return <>
                                            <div>
                                                {author.name}{' '}{author.surname}
                                            </div>
                                        </>

                                    })}
                                    </td>}

                                </td>
                                <td>{item.isbn}</td>
                                <td>{item.title}</td>
                                <td>{item.publisher}</td>
                                <td>{item.pageNumber}</td>
                                <td><button onClick={() => deleteBook(item.id)} style={{ fontSize: 10 }}>Delete</button></td>

                            </tr>
                        )


                    }

                </tbody>
            </table>

            <div style={{ display: 'flex', flexDirection: 'row' ,gap:60,flexWrap:'wrap',flex:1}}>
                <div style={{ display: 'flex', width: '120px', height: '50px',flexDirection:'column',flex:1}}>

                    <input placeholder='add title' onChange={(e) => setTitle(e.target.value)}></input>
                    <input placeholder='add isbn' onChange={(e) => setIsbn(e.target.value)} ></input>
                    <input placeholder='add page number' onChange={(e) => setPageNumber(e.target.value)}></input>
                    <input placeholder='add publisher' onChange={(e) => setPublisher(e.target.value)}></input>
                    <button onClick={() => addNewBook()}>post new book</button>
                </div>

                <div style={{ display: 'flex', width: '120px', height: '0px',flexDirection:'column',flex:1 }}>

                    <input placeholder='id to be updated' onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder='update title' onChange={(e) => setTitle(e.target.value)}></input>
                    <input placeholder='update isbn' onChange={(e) => setIsbn(e.target.value)} ></input>
                    <input placeholder='update page number' onChange={(e) => setPageNumber(e.target.value)}></input>
                    <input placeholder='update publisher' onChange={(e) => setPublisher(e.target.value)}></input>
                    <button onClick={() => updateBook(id)}>update book</button>
                </div>
                <div style={{ display: 'flex', width: '80px', height: '50px',flexDirection:'column' ,flex:1 }}>

                    <input placeholder='book id to be connected' onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder='author id to be connected' onChange={(e) => setAuthorId(e.target.value)}></input>
                    <button onClick={() => connectAuthor(id, authorId)}>connect authors</button>
                </div>
            </div>
        </div>
    )






}//eof books

export default Books;