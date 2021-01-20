import React, { useState, useEffect } from 'react';
import { Navbar, Card, Container, Row, Col } from 'react-bootstrap';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

const ToDo = () => {

  const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

  const [count, setCount] = useState();
  const [list, setList] = useState([]);

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  const _addItem = (item) => {
    //item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _putToggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(() => _getTodoItems())
        .catch(console.error);
    }
  };
  
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
