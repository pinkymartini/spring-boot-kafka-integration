import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';


const KafkaUpdates =()=>{

    const [messages, setMessages] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/api/v1/updates/")
        .then(res=>{
      
        setMessages([...res.data]);
        })
        }, [messages])

        const up = ()=>{
            this.forceUpdate();
        }

        return(
            <div ><h1 style={{color:'limegreen'}}>Topic: 'updates'</h1>
            <div style={{ width: '200px', height:'100px',borderStyle:'solid', borderColor:'red',display:'block',overflowY:'scroll'}}>
                {messages.map(message=><h1>{message}</h1>)}

            </div>
            </div>



        )



}

export default KafkaUpdates;