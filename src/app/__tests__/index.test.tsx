import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { App } from '../index';

const renderer = createRenderer();

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();

    expect(renderedOutput).toMatchSnapshot();
  });
});
