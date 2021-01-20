import React from 'react';
import { Container, Toast, Badge, Button, Row, Col } from 'react-bootstrap';

const TodoList = (props) => {
  return (
    <>
      <Col xs={6} md={6} lg={6}>
      {props.list.map(item => (
        <Toast show={true} onClose={() => props.handleDelete(item._id)} key={item._id}>
          <Toast.Header>
            <Badge onClick={() => props.handleComplete(item._id)}
              variant={item.complete ? 'success' : 'danger'}>
              <strong className="mr-auto">{item.complete ? 'Complete' : 'Pending'}</strong>
            </Badge>&nbsp;
            <strong className="mr-auto">{ item.assignee }</strong>
          </Toast.Header>
          <Toast.Body>
            <p>{item.text}</p>
            <p className="difficultyText">Difficulty: {item.difficulty}</p>
          </Toast.Body>
        </Toast>
      ))}
      </Col>
    </>
  );
}

export default TodoList;
