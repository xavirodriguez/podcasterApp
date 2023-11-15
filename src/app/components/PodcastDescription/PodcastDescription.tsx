import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import UnstyledLink from '../Styled/UnstyledLink';
interface PodcastProps {
  title: string;
  author: string;
  imageUrl: string;
  id: string;
}

const PodcastDescription = memo(
  ({ title, author, imageUrl, id }: PodcastProps) => {
    const { t } = useTranslation();

    return (
      <PodcastItem>
        <UnstyledLink to={`/podcast/${id}`}>
          <PodcastImage imageUrl={imageUrl} />
          <PodcastDetails>
            <PodcastTitle>{title}</PodcastTitle>
            <PodcastAuthor>
              {/**
               * In this project We can translate the interface in two different ways
               * - Using messages.ts which allows us to extract translations to a file
               * - Using the useTranslation hook from react-i18next, which is simpler.
               * */}
              {t('details.author')} : {author}
            </PodcastAuthor>
          </PodcastDetails>
        </UnstyledLink>
      </PodcastItem>
    );
  },
);

const PodcastItem = styled.div`
  position: relative;
  flex: 0 0 calc(25% - 20px);
  margin: 30px 10px;
`;

const PodcastImage = styled.div<{ imageUrl: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url(${props => props.imageUrl}) center/cover no-repeat;
  margin-right: 20px;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const PodcastDetails = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 70px 20px 20px;
`;

const PodcastTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const PodcastAuthor = styled.h4`
  font-size: 14px;
  color: #777;
  margin: 0;
`;

export default PodcastDescription;
