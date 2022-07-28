import React, { Component, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import KafkaDeletions from '../kafkaComponents/KafkaDeletions';


const Books = () => {
    const [books, setBooks] = useState([]);

    //new book names
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [publisher, setPublisher] = useState('');
    //const [author, setAuthor] = useState('');



    function getBooks() {
        axios.get("http://localhost:8080/api/v1/book/")
            .then(res => {

                setBooks(res.data);
            })

        // fetch("http://localhost:8080/api/v1/book/")
        // .then((result=>{
        //     result.json()
        //     .then((resp=>{
        //         setBooks(resp);
        //     }))
        // }))
    }


    function addNewBook(){
        axios.post('http://localhost:8080/api/v1/book/', {
            "title":title,
            "isbn":isbn,
            "pageNumber":pageNumber,
            "publisher":publisher
          })

          getBooks();


    }


    useEffect(() => {

        getBooks();

    }, [])


    function deleteBook(id) {

        axios.delete("http://localhost:8080/api/v1/book/" + id)
        getBooks();

    }


    return (
        <div id="card" style={{}}>
            <h1>Book List</h1>
            <table border={3} style={{ fontSize: 10 }}>
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
                            <td><button onClick={()=>deleteBook(item.id)} style={{fontSize:10}}>Delete</button></td>
                            </tr>
                        )


                    }

                </tbody>
            </table>
            

            <div style={{display:'block', width:'210px',height:'130px'} }>

            <input  placeholder='add title' onChange={(e)=>setTitle(e.target.value) }></input>
            <input placeholder='add isbn' onChange={(e)=>setIsbn(e.target.value)} ></input>
            <input placeholder='add page number' onChange={(e)=>setPageNumber(e.target.value)}></input>
            <input placeholder='add publisher' onChange={(e)=>setPublisher(e.target.value)}></input>
            <button onClick={()=>addNewBook()}>post new book</button>
            </div>
        </div>
    )


    // books.map((book, index) => {

    //     return <>
    //         <div id="card" style={{ width: '200px', marginLeft: 80, borderStyle: 'solid', borderColor: 'red' }}>
    //             <h1 style={{ display: 'inline-block', color: 'blue', backgroundColor: 'orange' }}> Book id: {book.id}</h1>

    //             <button style={{ fontSize: 10 }} onClick={() => deleteBook(book.id)}>Delete</button>





    //             <h1 style={{ color: 'white', backgroundColor: 'purple' }}>Authors: {

    //                 book.authors.length <= 0 ? <p1>No author info</p1> :

    //                     book.authors.map((author, index) => {
    //                         return <>
    //                             <div style={{ display: 'flex', flex: 1, flexDirection: 'row', gap: 5 }}>
    //                                 <p1 style={{ color: 'yellow', backgroundColor: 'blue' }}>{author.name}</p1>
    //                                 <p1 style={{ color: 'yellow', backgroundColor: 'pink' }}>{author.surname},</p1>
    //                             </div>
    //                         </>

    //                     })}


    //             </h1>

    //             <h1 style={{ color: 'blue' }}>Title: {book.title}</h1>
    //             <h1 style={{ color: 'blue' }}>Publisher: {book.publisher}</h1>
    //             <h1 style={{ color: 'blue' }}>pageNumber: {book.pageNumber}</h1>

    //         </div>
    //     </>

    // })



}

export default Books;