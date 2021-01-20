import React from 'react';
import { Navbar } from 'react-bootstrap';

import ToDo from './components/todo/todo.js';

const App = () => {
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
      </Navbar>
      <ToDo />
    </>
  );
}

export default App;
