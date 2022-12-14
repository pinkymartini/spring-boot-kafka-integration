import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import ReactDropdown from 'react-dropdown';
import Dropdown from 'react-dropdown';
// import Select from 'react-select'
import 'react-dropdown/style.css'
import { InputLabel, MenuItem, Select, Slider } from '@mui/material';


const KafkaAll =()=>{

    const [messages, setMessages] = useState([])
    const [chosenTopic,setChosenTopic] = useState('deletions')
    const [offset,setOffset] = useState(0)


    const options =[
        // {value:'readings', label:'Readings'},
        {value:'updates', label:'Updates'},
        {value:'deletions', label:'Deletions'},
        {value:'posts', label:'Posts'},
        {value:'books-sold', label:'Books Sold'},
    ]

    const fontStyles={
        control: (styles) =>({...styles, fontSize:10}),
        option: (styles) =>({...styles, fontSize:10})
    }

    const handleChange = (event) => {
        setChosenTopic(event.target.value);
      };


    function getTopics()
    {
        axios.get("http://localhost:8080/api/v1/"+chosenTopic+"/")
        .then(res=>{

            const newMessages = res.data
            
            setMessages([...newMessages]);
        })
        
    }

    function getTopicsbyOffset()
    {
        axios.get("http://localhost:8080/api/v1/"+chosenTopic+"/"+offset)
        .then(res=>{

            const newMessages = res.data
            
            setMessages([...newMessages]);
        })
        
    }

    useEffect(() => {
        // getTopics();
        getTopicsbyOffset();
    }, [messages])
    

        return(
            <div  style={{fontSize:5}}>
            <h1 style={{color:'steelblue'}}>{chosenTopic} Total Messages: {messages.length}</h1>
            <h1 style={{color:'red'}}>Set an Offset Value</h1>
            <div>
                <Slider 
                    size="small"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    min={0}
                    max={messages.length+offset-1}
                    onChange={(e) => setOffset(e.target.value)}
                />
                </div>

                
  <InputLabel id="demo-simple-select-label">Select a Topic</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={chosenTopic}
    label="ChosenTopic"
    onChange={handleChange}
    size='small'
  >
    <MenuItem value={"updates"}>Updates</MenuItem>
    <MenuItem value={"deletions"}>Deletions</MenuItem>
    <MenuItem value={"books-sold"}>Books-Sold</MenuItem>
    <MenuItem value={"posts"}>Posts</MenuItem>
  </Select>

            {/* <input placeholder='(optional) set an offset value' onChange={(e) => setOffset(e.target.value)}></input> */}
            
            {/* <Select   options={options} onChange={e=> setChosenTopic(e.value)} styles={fontStyles}></Select> */}

 
           
            <div     style={{ width: '200px', height:'300px',borderStyle:'solid', borderColor:'red',display:'block',overflowY:'scroll', borderRadius:4}}>
                
                {messages.map(message=><h1>{message}</h1>)
                
                }


            </div>
            
            
           
            </div>



        )




}

export default KafkaAll;