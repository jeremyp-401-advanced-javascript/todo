import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { AppSettingsContext } from '../contexts/AppSettings';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjaxCalls from './hooks/ajax';

import './todo.scss';

const ToDo = () => {
  const appSettingsContext = useContext(AppSettingsContext);
  const [list, todoAPI, setList, _getTodoItems, _addItem, _putToggleComplete, _deleteItem] = useAjaxCalls();
  // TODO: Replace the current form change/submit handlers with the useForm() custom hook to manage the “Add Item” form

  const [formViewCompleted, setFormViewCompleted] = useState(appSettingsContext.viewCompleted);
  const [formShowItems, setFormShowItems] = useState(appSettingsContext.showItems);
  const [formSortBy, setFormSortBy] = useState(appSettingsContext.sortBy);

  const handleShowCompleted = (e) => {
    setFormViewCompleted(e.target.checked);
  }
  const handleSortBy = (e) => {
    setFormViewCompleted(e.target.value);
  }
  const handleShowItems = (e) => {
    setFormShowItems(e.target.value);
  }

  useEffect(() => {
    appSettingsContext.toggleViewCompleted(formViewCompleted)
  }, [formViewCompleted])
  useEffect(() => {
    appSettingsContext.setSortBy(formSortBy)
  }, [formSortBy])
  useEffect(() => {
    appSettingsContext.setShowItems(formShowItems)
  }, [formShowItems])

  return (
    <Container>
      <Row>
        <Col>
          <Card variant="dark">
            <Card.Header bg="dark">To Do List Manager ({appSettingsContext.count})</Card.Header>
            <Card.Body>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Label htmlFor="showCompleted">Show Completed:&nbsp;</Form.Label>
                    <Form.Check type="switch" id="showCompleted"
                      onChange={handleShowCompleted} checked={appSettingsContext.viewCompleted}
                    />
                  </Col>
                  <Col>
                    <Form.Label className="" htmlFor="sortBySelect">Sort By:&nbsp;</Form.Label>
                    <Form.Control as="select" className="" id="sortBySelect" custom
                      defaultValue={appSettingsContext.sortBy} onChange={handleSortBy}>
                      <option value="">None</option>
                      <option value="difficulty">Difficulty</option>
                      <option value="assignee">Assigned To</option>
                      <option value="text">Todo Text</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Label className="" htmlFor="showItemsSelect">Show:&nbsp;</Form.Label>
                    <Form.Control as="select" className="" id="showItemsSelect" custom
                      defaultValue={appSettingsContext.showItems} onChange={handleShowItems}>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </Form.Control>
                  </Col>
                </Form.Row>
              </Form>
              <Row>
                <Col>
                  <TodoForm handleSubmit={_addItem} />
                </Col>
                <Col>
                  <TodoList
                    list={list}
                    handleComplete={_putToggleComplete}
                    handleDelete={_deleteItem}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default ToDo;
