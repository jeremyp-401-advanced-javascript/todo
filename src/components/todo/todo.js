import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjaxCalls from './hooks/ajax';

import './todo.scss';

const ToDo = () => {
  const [list, todoAPI, setList, _getTodoItems, _addItem, _putToggleComplete, _deleteItem] = useAjaxCalls();
  // TODO: Replace the current form change/submit handlers with the useForm() custom hook to manage the “Add Item” form
  const [count, setCount] = useState();
  
  useEffect(() => {
    setCount(list.filter(item => !item.complete).length); // setCount(numberOfCompleteTrueThings)
  }, [list]);

  useEffect(() => {
    document.title = `To Do List: (${count})`;
  }, [count]);
  
  return (
    <Container>
      <Row>
        <Col>
          <Card variant="dark">
            <Card.Header bg="dark">To Do List Manager ({count})</Card.Header>
            <Card.Body>
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
