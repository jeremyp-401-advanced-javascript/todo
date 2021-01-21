import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { AppSettingsContext } from '../contexts/AppSettings';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjaxCalls from './hooks/ajax';

import './todo.scss';

const ToDo = () => {
  const appSettingsContext = useContext(AppSettingsContext);
  const [ list, todoAPI, setList, _getTodoItems, _addItem, _putToggleComplete, _deleteItem ] = useAjaxCalls();
  // TODO: Replace the current form change/submit handlers with the useForm() custom hook to manage the “Add Item” form
     
  return (
    <Container>
      <Row>
        <Col>
          <Card variant="dark">
            <Card.Header bg="dark">To Do List Manager ({appSettingsContext.count})</Card.Header>
            <Card.Body>
              <section>
                <p>Just a sexy little test:</p>
                <p>View Completed: {(appSettingsContext.viewCompleted) ? 'true' : 'false' }</p>
                <p>Sort Items: {appSettingsContext.showItems}</p>
                <p>Sort By: {appSettingsContext.sortBy}</p>
              </section>
              <section className="d-flex flex-row justify-content-start">
                  <TodoForm handleSubmit={_addItem} />
                  <TodoList
                    list={list}
                    handleComplete={_putToggleComplete}
                    handleDelete={_deleteItem}
                    />
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
}

export default ToDo;
