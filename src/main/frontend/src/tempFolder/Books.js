import React, { Component, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import KafkaDeletions from '../kafkaComponents/KafkaDeletions';
import { Button, Chip, TextField } from '@mui/material';





const Books = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});

    //new book names
    const [title, setTitle] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [id, setId] = useState(null);
    const [authorId, setAuthorId] = useState(0);

    var [money, setMoney] = useState(0);
    const [quantity, setQuantity] = useState(0);




    useEffect(() => {

        getBooks();
    }, [])

    useEffect(() => {

        getBook();
    }, [id])


    function getBooks() {
        axios.get("http://localhost:8080/api/v1/book/")
            .then(res => {
                const newBooks = res.data
                setBooks([...newBooks]);
            })
    }

    function getBook()
    {
        axios.get(`http://localhost:8080/api/v1/book/` + id,
        {
        })
        .then(res => {
           setBook(res.data)
         })
    }


    function addNewBook() {
        axios.post('http://localhost:8080/api/v1/book/', {
            "title": title,
            "isbn": isbn,
            "pageNumber": pageNumber,
            "publisher": publisher,
            "pageNumber": pageNumber,
        })
        .then(res => {
           getBooks()
        })
        
    }


    function updateBook(id) {

                axios.put(`http://localhost:8080/api/v1/book/` + id,
                {
                    "title":title,
                    "isbn":isbn,
                    "pageNumber":pageNumber,
                    "publisher": publisher

                })
                .then(res => {
                    getBooks()
                 })       
            
    }

    function sellBook(id)
    {
          axios.put(`http://localhost:8080/api/v1/book/` + id+"/sold",
          {
              "quantity":quantity
              
          })
          .then(res => {
            getBooks();
            
              setMoney(money+=quantity*book.price)
              console.log(book.price)
              console.log(quantity)
            
           })     
    }

    function connectAuthor(bookId, authorId) {
        axios.put(`http://localhost:8080/api/v1/book/` + bookId + '/author/' + authorId)
        .then(res => {
            getBooks()
         })
            
                //getBooks();
            
    }

    function deleteBook(id) {

        axios.delete("http://localhost:8080/api/v1/book/" + id)
        .then(res => {
            getBooks()
         })
        
        //getBooks();

    }



    return (
        //table'a height or div'e flex value ikisinden biri ancak. yada display
        <div id="card" style={{display:'flex',flexDirection:'column' ,flex:2}}>
            <h1 style={{fontWeight:'bold',color:'red'}}>Book List</h1>
            <table border={4} style={{ fontSize:10, backgroundColor:'wheat',height:'10px', overflowY:'scroll'}}>
                <tbody>
                    <tr style={{fontWeight:'bold', color:'blue'}}>
                        <td >ID</td>
                        <td>Authors</td>
                        <td>ISBN</td>
                        <td>Title</td>
                        <td>Publisher</td>
                        <td>Page Number</td>
                        <td>Price</td>
                        <td>Quantity</td>
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
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td><Button size='small' variant="contained" onClick={() => deleteBook(item.id)} style={{ fontSize: 8 }}>Delete</Button></td>

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
                    <Button variant="contained" onClick={() => addNewBook() }>post new book</Button>
                </div>

                <div style={{ display:'grid' ,flex:1 }}>

                    <input placeholder='id to be updated' onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder='update title' onChange={(e) => setTitle(e.target.value)}></input>
                    <input placeholder='update isbn' onChange={(e) => setIsbn(e.target.value)} ></input>
                    <input placeholder='update page number' onChange={(e) => setPageNumber(e.target.value)}></input>
                    <input placeholder='update publisher' onChange={(e) => setPublisher(e.target.value)}></input>
                    <Button variant="contained" onClick={() => updateBook(id)}>update book</Button>
                </div>
                <div style={{ display:'grid' ,flex:1}}>

                    <input placeholder='book id to be connected' onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder='author id to be connected' onChange={(e) => setAuthorId(e.target.value)}></input>
                    <Button variant="contained"  onClick={() => connectAuthor(id, authorId)}>connect authors</Button>
                </div>

                <div style={{ display:'grid' ,flex:1}}>


                <input placeholder='book id to sell' onChange={(e) => setId(e.target.value)}></input>
                <input style={{}} placeholder='amount?' onChange={(e) => setQuantity(e.target.value)}></input>
                <Button style={{backgroundColor:'pink'}} variant="text" onClick={() => sellBook(id)}>Make a Sale</Button>
                <Chip label= {<div>money earned this session: {money} dollars</div>}></Chip>
                </div>
            </div>
        </div>
    )






}//eof books

export default Books;