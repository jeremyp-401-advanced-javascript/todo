import React from 'react';
import { ListGroup, Container } from 'react-bootstrap';

const TodoList = (props) => {
  return (
    <Container>

        <ListGroup>
          {props.list.map(item => (
            <ListGroup.Item 
              onClick={() => props.handleComplete(item._id)}
              variant={item.complete ? 'success' : 'danger'} data-testid='listItem'
              className={`complete-${item.complete.toString()}`} key={item._id} >
              <span>{item.text}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>

    </Container>
  );
}

export default TodoList;
