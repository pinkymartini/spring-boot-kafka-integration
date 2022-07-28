import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';


const KafkaDeletions =()=>{

    const [messages, setMessages] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/api/v1/deletions/")
        .then(res=>{
      
        setMessages(res.data);
        })
        }, [messages])

        const up = ()=>{
            this.forceUpdate();
        }

        return(
            <div><h1>topic: 'deletions'</h1>
            <div style={{ width: '120px', height:'120px',borderStyle:'solid', borderColor:'red',display:'block',overflowY:'scroll'}}>
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

export default KafkaDeletions;