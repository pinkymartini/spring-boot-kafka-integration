import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import ReactDropdown from 'react-dropdown';
import Dropdown from 'react-dropdown';
import Select from 'react-select'
import 'react-dropdown/style.css'




const KafkaAll =()=>{

    const [messages, setMessages] = useState([])
    const [chosenTopic,setChosenTopic] = useState('deletions')
    // const options =[
    //     'readings','updates','deletions','posts']
    const options =[
        {value:'readings', label:'Readings'},
        {value:'updates', label:'Updates'},
        {value:'deletions', label:'Deletions'},
        {value:'posts', label:'Posts'},
    ]

    const fontStyles={
        control: (styles) =>({...styles, fontSize:10}),
        option: (styles) =>({...styles, fontSize:10})
    }

    function changeTopic (string){
        setChosenTopic(string)
    }

    function getTopics()
    {
        axios.get("http://localhost:8080/api/v1/"+chosenTopic+"/")
        .then(res=>{

            const newMessages = res.data
            
            setMessages([...newMessages]);
        })
        
    }

    useEffect(() => {
        getTopics();
    }, [messages])
    

        return(
            <div  style={{fontSize:5}}><h1 style={{color:'steelblue'}}>Topicss'</h1>

             {/* <ReactDropdown  options={options} onChange={e=> setChosenTopic(e.value)} > </ReactDropdown> */}

             <Select   options={options} onChange={e=> setChosenTopic(e.value)} styles={fontStyles}></Select>
            

           
            <div     style={{ width: '200px', height:'600px',borderStyle:'solid', borderColor:'red',display:'block',overflowY:'scroll'}}>
                
                {messages.map(message=><h1>{message}</h1>)
                
                }


            </div>
            
            
           
            </div>



        )




}

export default KafkaAll;