import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const TodoForm = (props) => {
  const [item, setItem] = useState({text: '', difficulty: 1, assignee: ''});

  const _changeInput = (e) => {
    setItem({...item, [e.target.name]: e.target.value}); 
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
    <>
      <Card>
        <Card.Header>Add To Do Item</Card.Header>
        <Card.Body>
          <Form onSubmit={_submitForm}>
            <Form.Label>To Do Item
              <Form.Control name="text" data-testid="textInput" placeholder="Item Details" onBlur={_changeInput} />
            </Form.Label>
            <Form.Label>Assigned To
              <Form.Control type="text" data-testid="assigneeInput" name="assignee" placeholder="Assignee Name" onBlur={_changeInput} />
            </Form.Label>
            <Form.Label>Difficulty Rating
              <Form.Control type="range" data-testid="difficultyInput" name="difficulty" defaultValue="1" min="1" max="5" custom onBlur={_changeInput} />
            </Form.Label>
            <Button data-testid="submitButton" type="submit" variant="primary">Add Item</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default TodoForm;
