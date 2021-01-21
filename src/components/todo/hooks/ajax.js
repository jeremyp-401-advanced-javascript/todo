import React, { useState, useEffect, useContext } from 'react';
import { AppSettingsContext } from '../../contexts/AppSettings';

function useAjaxCalls() {
  // TODO: Make it work
  // TODO: Separate out functions
  const [list, setList] = useState([]);
  const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';
  const appSettingsContext = useContext(AppSettingsContext);

  useEffect(() => {
    appSettingsContext.updateCount(list.filter(item => !item.complete).length); // setCount(numberOfCompleteTrueThings)
  }, [list]);

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
  
  return [list, todoAPI, setList, _getTodoItems, _addItem, _putToggleComplete, _deleteItem];
}

export default useAjaxCalls;