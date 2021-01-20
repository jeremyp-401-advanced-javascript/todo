import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';

const TodoForm = (props) => {
  const [item, setItem] = useState({ text: '', difficulty: 1, assignee: '' });

  const _changeInput = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  // This runs only when the item changes
  useEffect(() => {
    console.log(`useEffect says: `, item);
  }, [item])

  const _submitForm = (event) => {
    event.preventDefault();
    event.target.reset(); // Need to reset the form
    let send = (item.text && item.difficulty && item.assignee) ? true : false;
    send && props.handleSubmit(item);
    setItem({});
  }

  return (
    <Col xs={6} md={6} lg={6}>
      <Card>
        <Card.Header>Add To Do Item</Card.Header>
        <Card.Body>
          <Form onSubmit={_submitForm}>
            <Form.Group>
              <Form.Label>To Do Item
              <Form.Control name="text" data-testid="textInput" placeholder="Item Details" onBlur={_changeInput} />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Assigned To
              <Form.Control type="text" data-testid="assigneeInput" name="assignee" placeholder="Assignee Name" onBlur={_changeInput} />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Difficulty Rating
              <Form.Control type="range" data-testid="difficultyInput" name="difficulty" defaultValue="1" min="1" max="5" custom onBlur={_changeInput} />
              </Form.Label>
            </Form.Group>
            <Button data-testid="submitButton" type="submit" variant="primary">Add Item</Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TodoForm;
