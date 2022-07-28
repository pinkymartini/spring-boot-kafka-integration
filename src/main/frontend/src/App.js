import logo from './logo.svg';
import './App.css';
import React from 'react';
import Books from './tempFolder/Books';
import BookComponent from './tempFolder/BookComponent';
import AuthorComponent from './tempFolder/AuthorComponent';






function App() {
  return (
 

  <div id = "app" style={{backgroundColor:'white', fontSize:5,display:'flex', flexDirection:'row'}}>
  <BookComponent ></BookComponent>
  <AuthorComponent></AuthorComponent>
  </div>
  
  );
}

export default App;
