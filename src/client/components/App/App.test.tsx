/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import * as chainApi from '../../services/ChainApi';
jest.mock('../../services/ChainApi');

describe('components / App', () => {
  it('should match the snapshot', async () => {
    (chainApi.fetchBlocks as jest.Mock).mockResolvedValueOnce([]);

    const component = render(<App />);

    expect(component.container.firstChild).toMatchSnapshot();
  });
});
