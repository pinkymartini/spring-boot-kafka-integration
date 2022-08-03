import React, { Component, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import KafkaDeletions from '../kafkaComponents/KafkaDeletions';


const Books = () => {
    const [books, setBooks] = useState([]);

    //new book names
    const [title, setTitle] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [id, setId] = useState(null);
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

        // setTitle("");
        // setIsbn("");
        // setPageNumber("");
        // setPublisher("");

    }

    // function updateBook(id) {

    //     axios.put(`http://localhost:8080/api/v1/book/` + id + '/?' + 'isbn=' + isbn + '&' + 'title=' + title + '&' + 'pageNumber=' + pageNumber + '&' + 'publisher=' + publisher)
            
                
    //             getBooks();
            
    // }

    function updateBook(id) {

                axios.put(`http://localhost:8080/api/v1/book/` + id,
                {
                    "title":title,
                    "isbn":isbn,
                    "pageNumber":pageNumber,
                    "publisher": publisher

                })
            
                
                getBooks();
            
    }

    function connectAuthor(bookId, authorId) {
        axios.put(`http://localhost:8080/api/v1/book/` + bookId + '/author/' + authorId)
            
                getBooks();
            
    }

    function deleteBook(id) {

        axios.delete("http://localhost:8080/api/v1/book/" + id)
        
        getBooks();

    }



    return (
        <div id="card" style={{display:'flex',flexDirection:'column',flex:1.5,}}>
            <h1 style={{fontWeight:'bold',color:'red'}}>Book List</h1>
            <table border={3} style={{ fontSize: 10, backgroundColor:'wheat'}}>
                <tbody>
                    <tr style={{fontWeight:'bold', color:'blue'}}>
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
                            <tr key={i} style={{}}>
                                <td>{item.id}</td>

                                <td> {item.authors.length <= 0 ? "no author info" :
                                    <> {item.authors.map((author, index) => {
                                        return <>
                                            <div>
                                                {author.name}{' '}{author.surname}
                                            </div>
                                        </>

                                    })}
                                    </>}

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

            <div style={{ display: 'flex', flexDirection: 'row', flex:1, flexWrap:'wrap',}}>

                <div style={{  display:'grid' ,flex:1, }}>

                    <input placeholder='add title' value={title == '' ? title:null} onChange={(e) => setTitle(e.target.value)}></input>
                    <input placeholder='add isbn' value={isbn == '' ? isbn:null} onChange={(e) => setIsbn(e.target.value)} ></input>
                    <input placeholder='add page number' value={pageNumber== '' ? pageNumber:null} onChange={(e) => setPageNumber(e.target.value)}></input>
                    <input placeholder='add publisher' value={publisher== '' ? publisher:null} onChange={(e) => setPublisher(e.target.value)}></input>
                    <button onClick={() => addNewBook() }>post new book</button>
                </div>

                <div style={{ display:'grid' ,flex:1 }}>

                    <input placeholder='id to be updated' onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder='update title' onChange={(e) => setTitle(e.target.value)}></input>
                    <input placeholder='update isbn' onChange={(e) => setIsbn(e.target.value)} ></input>
                    <input placeholder='update page number' onChange={(e) => setPageNumber(e.target.value)}></input>
                    <input placeholder='update publisher' onChange={(e) => setPublisher(e.target.value)}></input>
                    <button onClick={() => updateBook(id)}>update book</button>
                </div>
                <div style={{ display:'grid' ,flex:1}}>

                    <input placeholder='book id to be connected' onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder='author id to be connected' onChange={(e) => setAuthorId(e.target.value)}></input>
                    <button onClick={() => connectAuthor(id, authorId)}>connect authors</button>
                </div>
            </div>
        </div>
    )






}//eof books

export default Books;