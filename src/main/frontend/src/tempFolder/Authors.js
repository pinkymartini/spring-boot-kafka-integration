import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';


const Authors =()=>{

    const [authors, setAuthors] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/api/v1/author/")
        .then(res=>{
      
        setAuthors(res.data);
        })
        }, [])

        // return authors.map((author,index)=>{
             
        //     return <>
        //     <div id="card" style={{backgroundColor:'white', width:'200px',borderStyle:'solid',borderColor:'red'} }>
             
        //      <div style={{ backgroundColor: 'green',  textAlign:'center',flex:1,fontSize:10,display:'flex', flexDirection:'row',}}>
        //     <h1  style={{flex:1, color:'magenta',backgroundColor:'orange' }}>Author id: {author.id}</h1> 
        //     </div>

        //     <h1  style={{color:'blue'}}>Author Name: {author.name}</h1>
        //     <h1  style={{color:'blue'}}>Author Surname: {author.surname}</h1>
        //     <h1  style={{color:'blue'}}>Date of Birth: {author.dob}</h1>
        
        //     </div>
        //     </>
 
        //  })

        function deleteAuthor(id){
            axios.delete("http://localhost:8080/api/v1/author/"+id)
            axios.get("http://localhost:8080/api/v1/author/")
            .then(res=>{
      
            setAuthors(res.data);
        })

        }

        return (
            <div id="card" style={{}}>
                <h1>Author List</h1>
                <table border={2} style={{ fontSize: 10 }}>
                    <tbody>
                        <tr>
                            <td >ID</td>
                            <td>Name</td>
                            <td>Surname</td>
                            <td>Date of Birth</td>
                            <td>Delete?</td>
                        </tr>
                        {
                            authors.map((item, i) =>
                                <tr key={i}>
                                    <td>{item.id}</td>
                                
                            
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.dob}</td>
                                <td><button onClick={()=>deleteAuthor(item.id)}>Delete</button></td>
                                </tr>
                            )
    
    
                        }
    
                    </tbody>
                </table>
            </div>
        )


}

export default Authors;