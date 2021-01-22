// import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app';

describe('Form', () => {
  test('Can add an item to the list', async () => {
    render(<App />)
    userEvent.type(await screen.getByTestId('textInput'), 'Cook Dinner');
    userEvent.type(await screen.getByTestId('assigneeInput'), 'Jeremy Penning');
    userEvent.type(await screen.getByTestId('difficultyInput'), '3');
    userEvent.click(await screen.getByTestId('submitButton'));
    let items = waitFor(() => {
      screen.getAllByTestId('listItem');
    })
    expect(items[items.length - 1]).toHaveTextContent('Cook Dinner');
  })
});
