import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const TodoForm = (props) => {

  //const [item, setItem] = useState({text: '', difficulty: 1, assignee: ''});
  const [item, setItem] = useState({});

  const _changeInput = (e) => {
    setItem({...item, [e.target.name]: e.target.value}); 
  }

  // This runs only when the item changes
  useEffect(() => {
    console.log(item);
  }, [item])

  const _submitForm = (e) => {
    e.preventDefault();
    e.target.reset();
    //let send = (item.text && item.difficulty && item.assignee) ? true : false;
    //send && props.handleSubmit(item);
    item.text && item.difficulty && item.assignee && props.handleSubmit(item);
    setItem({});
  }

  return (
    <>
      <Card>
        <Card.Header>Add To Do Item</Card.Header>
        <Card.Body>
          <Form onSubmit={_submitForm}>
            <Form.Label>To Do Item
              <Form.Control name="text" placeholder="Item Details" onBlur={_changeInput} />
            </Form.Label>
            <Form.Label>Assigned To
              <Form.Control type="text" name="assignee" placeholder="Assignee Name" onBlur={_changeInput} />
            </Form.Label>
            <Form.Label>Difficulty Rating
              <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" custom onBlur={_changeInput} />
            </Form.Label>
            <Button variant="primary">Add Item</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default TodoForm;
