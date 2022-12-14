import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';


const KafkaReadings =()=>{

    const [messages, setMessages] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/api/v1/readings/")
        .then(res=>{
      
        setMessages([...res.data]);
        })
        }, [messages])

        const up = ()=>{
            this.forceUpdate();
        }

        return(
            <div style={{}}><h1 style={{color:'goldenrod'}}>Topic: 'readings'</h1>
            <div style={{ width: '200px', height:'100px',borderStyle:'solid', borderColor:'red',display:'block',overflowY:'scroll'}}>
                {messages.map(message=><h1>{message}</h1>)}

            </div>
            </div>



        )



        // return messages.map((message,index)=>{
             
        //     return <>
        //     <div style={{}}>
                  
        //     <h1  style={{color:'magenta',backgroundColor:'orange' }}>{message}</h1> 
        //     </div>

        //     </>
 
        //  })


}

export default KafkaReadings;