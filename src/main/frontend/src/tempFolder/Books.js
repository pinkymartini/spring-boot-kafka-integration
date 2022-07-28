import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const Books= ()=>
{  
    const [books, setBooks] = useState([])


    



    useEffect(() => {

        axios.get("http://localhost:8080/api/v1/book/")
        .then(res=>{
    
        setBooks(res.data);
        })
        },[])

        const deleteBook =(event,id)=>{
            
            axios.delete("http://localhost:8080/api/v1/book/"+id)
            
            axios.get("http://localhost:8080/api/v1/book/")
            .then(res=>{
            setBooks(res.data);
            })
            


        }
        

        return books.map((book,index)=>{
             
           return <>
           <div id="card" style={{width:'200px', marginLeft:80, borderStyle:'solid',borderColor:'red'} }>
            
            <div style={{ backgroundColor: 'green',  textAlign:'center',fontSize:10}}>
           <h1  style={{display:'inline-block', color:'blue',backgroundColor:'orange'}}>Book id: {book.id}</h1>

           <button style={{fontSize:10}} onClick = { event => deleteBook(event, book.id) }>Delete</button>
           <h1  style={{display:'inline-block',color:'blue'}}>damns id:</h1>
           </div>

           <h1  style={{color:'white', backgroundColor:'purple'}}>Authors: {

                        book.authors.length<=0 ? <h1>No author info</h1> :
                        
                        book.authors.map((author,index)=>{
                               return <>
                                        <div style={{display:'flex',flex:1 , flexDirection:'row',gap:10 }}>
                                        <h1 style ={{color:'yellow',backgroundColor:'blue' }}>{author.name}</h1>
                                        <h1 style ={{color:'yellow', backgroundColor:'pink'}}>{author.surname},</h1>
                                        </div>
                                    </>
                                
                            })}

                      
           </h1>

           <h1  style={{color:'blue'}}>Title: {book.title}</h1>
           <h1  style={{color:'blue'}}>Publisher: {book.publisher}</h1>
           <h1  style={{color:'blue'}}>pageNumber: {book.pageNumber}</h1>
       
           </div>
           </>

        })

}

export default Books;