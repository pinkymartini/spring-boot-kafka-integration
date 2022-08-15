import React, { Component, useCallback, useEffect, useState } from 'react';
import axios from 'axios';



const BookSeller = ()=>{
    const [book, setBook] = useState({});
    var [money, setMoney] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [id, setId] = useState(null);

    useEffect(() => {
    getBook();
       
    }, [id])

    function getBook()
    {
        axios.get(`http://localhost:8080/api/v1/book/` + id,
        {
        })
        .then(res => {
           setBook(res.data)
         })
    }



    function sellBook(id)
    {
          axios.put(`http://localhost:8080/api/v1/book/` + id+"/sold",
          {
              "quantity":quantity
              
          })
          .then(res => {
            getBook();
            
              setMoney(money+=quantity*book.price)
              console.log(book.price)
              console.log(quantity)
            
           })     
    }

    return(
        <div style={{display: 'flex', flexDirection:'column',flexWrap:'wrap'}}>
            <h1>Book Seller Component</h1>
            <input placeholder='book id to sell' onChange={(e) => setId(e.target.value)}></input>
            <input placeholder='amount?' onChange={(e) => setQuantity(e.target.value)}></input>
            <td><button onClick={() => sellBook(id)} style={{ fontSize: 10 }}>Sell</button></td>
            <h1>Money Earned: {money}</h1>
        </div>
    )
    

}

export default BookSeller;