/**
 *
 * PodcastInfo
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {
  image: string;
  title: string;
  author: string;
  description: string | undefined;
}

export const PodcastInfo = memo((props: Props) => {
  const { t } = useTranslation();
  const { image, title, author, description } = props;

  return (
    <>
      <Cover src={image} />
      <hr />
      <p>{t('details.podcastBy', { title, author })}</p>
      {description && <p>{description}</p>}
    </>
  );
});

const Cover = styled.img`
  width: 80%;
  margin: 0 auto;
  display: block;
`;
