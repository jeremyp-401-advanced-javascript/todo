import React, { useState, useContext, useEffect } from 'react';
import { Container, Toast, Badge, Button, Row, Col, Pagination } from 'react-bootstrap';
import { AppSettingsContext } from '../contexts/AppSettings';

const TodoList = (props) => {
  const appSettingsContext = useContext(AppSettingsContext);
  const [pageNum, setPageNum] = useState(1);
  const [lowLimit, setLowLimit] = useState(0);
  const [highLimit, setHighLimit] = useState(appSettingsContext.showItems * (pageNum - 1));

  useEffect(() => {
    setLowLimit(pageNum * appSettingsContext.showItems);
  }, [pageNum]);

  useEffect(() => {
    setHighLimit((pageNum + 1) * appSettingsContext.showItems);
  }, [pageNum]);

  let pageItems = [];
  for (let number = 1; number <= Math.ceil(appSettingsContext.count / appSettingsContext.showItems); number++) {
    pageItems.push(
      <Pagination.Item key={number} active={number === pageNum}>
        {number}
      </Pagination.Item>,
    );
  }
  
  const paginationBasic = (
    <div>
      <Pagination size="lg">{pageItems}</Pagination>
    </div>
  );

  return (
    <>
      <Col xs={6} md={6} lg={6}>
      {props.list.slice(lowLimit, highLimit).map(item => ( // Obviously change this to 
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
        <Row>
          <div>{paginationBasic}</div>
        </Row>
      </Col>
    </>
  );
}

export default TodoList;
