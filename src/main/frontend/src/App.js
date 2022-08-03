import logo from './logo.svg';
import './App.css';
import React from 'react';
import Books from './tempFolder/Books';
import BookComponent from './tempFolder/BookComponent';
import AuthorComponent from './tempFolder/AuthorComponent';
import DeletionComponent from './kafkaComponents/KafkaMonitors';
import KafkaDeletions from './kafkaComponents/KafkaDeletions';
import KafkaMonitors from './kafkaComponents/KafkaMonitors';






function App() {
  return (
 

  <div id = "app" style={{backgroundColor:'white', flex:1, fontSize:5,display:'flex',flexDirection:'row' , gap:'50px'}}>
  <BookComponent ></BookComponent>
  <AuthorComponent></AuthorComponent>
  <KafkaMonitors></KafkaMonitors>
  </div>
  
  );
}

export default App;
