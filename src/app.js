import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import AppSettingsContext from './components/contexts/AppSettings.js';

import ToDo from './components/todo/todo.js';

const App = () => {
  return (
    <AppSettingsContext>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
      </Navbar>
      <ToDo />
    </AppSettingsContext>
  );
}

export default App;
