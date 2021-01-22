import React, { useState, useContext, useEffect } from 'react';
import { Container, Toast, Badge, Button, Row, Col, Pagination } from 'react-bootstrap';
import { AppSettingsContext } from '../contexts/AppSettings';

const TodoList = (props) => {
  const appSettingsContext = useContext(AppSettingsContext);
  const [pageNum, setPageNum] = useState(1);
  const [lowLimit, setLowLimit] = useState();
  const [highLimit, setHighLimit] = useState();

  useEffect(() => {
    setLowLimit(appSettingsContext.showItems * (pageNum - 1));
  }, [pageNum, appSettingsContext.showItems]);

  useEffect(() => {
    setHighLimit(appSettingsContext.showItems * (pageNum));
  }, [pageNum, appSettingsContext.showItems]);

  let pageTotal = Math.ceil(appSettingsContext.count / appSettingsContext.showItems);

  // Push the "First" and "Previous"
  let pageItems = [];
  pageItems.push( // First
    <Pagination.First onClick={() => setPageNum(1)} key='pageFirst' disabled={pageNum === 1} />
  );
  pageItems.push( // Previous
    <Pagination.Prev onClick={() => setPageNum(pageNum - 1)} key='pagePrevious' disabled={pageNum === 1} />
  );
  // Push everything else
  for (let number = 1; number <= pageTotal; number++) {
    pageItems.push(
      <Pagination.Item onClick={() => setPageNum(number)} key={number} active={number === pageNum}>
        {number}
      </Pagination.Item>,
    );
  }
  // Push the "Next" and "Last"
  pageItems.push( // Next
    <Pagination.Next onClick={() => setPageNum(pageNum + 1)} key='pageNext' disabled={pageNum === pageTotal} />
  );
  pageItems.push( // Last
    <Pagination.Last onClick={() => setPageNum(pageTotal)} key='pageLast' disabled={pageNum === pageTotal} />
  );
  
  const paginationBasic = (
    <Pagination className='listPages' size="sm">{pageItems}</Pagination>
  );

  return (
    <>
      <Col>
        <Row>
        {props.list 
          // !item.complete - show only pending // item.complete - show only completed
          // appSettingsContext.viewCompleted - true or false
          .filter(item => {
            return (!item.complete || item.complete) // Needs to resolve to be true to be included
          })
          .slice(lowLimit, highLimit)
          .sort(item => {})
          .map(item => (
            <Toast show={true} onClose={() => props.handleDelete(item._id)} key={item._id}>
              <Toast.Header>
                <Badge onClick={() => props.handleComplete(item._id)}
                  variant={item.complete ? 'success' : 'danger'}>
                  <strong className="mr-auto">{item.complete ? 'Complete' : 'Pending'}</strong>
                </Badge>&nbsp;
                <strong className="mr-auto">{item.assignee}</strong>
              </Toast.Header>
              <Toast.Body>
                <p>{item.text}</p>
                <p className="difficultyText">Difficulty: {item.difficulty}</p>
              </Toast.Body>
            </Toast>
          ))}
        </Row>
        <Row className="justify-content-md-center">
          {paginationBasic}
        </Row>
      </Col>
    </>
  );
}

export default TodoList;
