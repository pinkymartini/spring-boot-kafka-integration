import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Chip, TextField } from '@mui/material';

const Authors = () => {

    const [authors, setAuthors] = useState([])

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [dob, setDob] = useState('')


    function getAuthors() {
        axios.get("http://localhost:8080/api/v1/author/")
            .then(res => {

                setAuthors(res.data);
            })

    }


    useEffect(() => {

        getAuthors();
    }, [])


    function deleteAuthor(id) {
        axios.delete("http://localhost:8080/api/v1/author/" + id)
            .then(res => {

                getAuthors();
            })
    }

    function addNewAuthor() {



        axios.post('http://localhost:8080/api/v1/author/', {
            "name": name,
            "surname": surname,
            "dob": dob,
        })
        .then(res => {
           
            getAuthors();
        })

        

    }

    return (
        <div id="card" style={{display:'flex',flexDirection:'column',flex:1}}>
            <h1 style ={{color:'darkorange'}}>Author List</h1>
            <table border={2} style={{ fontSize: 10, backgroundColor:'cyan'}}>
                <tbody>
                    <tr style={{fontWeight:'bold', color:'orange'}}>
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
                                <td><Button size='small' variant="contained" style={{fontSize:8}} onClick={() => deleteAuthor(item.id)}>Delete</Button></td>
                            </tr>
                        )


                    }

                </tbody>
            </table>
            <div style={{ display: 'flex',flex:1,flexDirection:'column' }}>

                <input placeholder='add name' onChange={(e) => setName(e.target.value)}></input>
                <input placeholder='add surname' onChange={(e) => setSurname(e.target.value)} ></input>
                <input placeholder='add date of birth' onChange={(e) => setDob(e.target.value)}></input>
                <Button variant="contained" onClick={() => addNewAuthor()}>post new author</Button>
            </div>
        </div>
    )


}

export default Authors;