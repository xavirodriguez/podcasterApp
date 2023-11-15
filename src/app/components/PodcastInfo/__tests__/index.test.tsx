import { render } from '@testing-library/react';
import * as React from 'react';

import { PodcastInfo } from '..';

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

describe('<PodcastInfo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <PodcastInfo image={''} title={''} author={''} description={undefined} />,
    );

    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
