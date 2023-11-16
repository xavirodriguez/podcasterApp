import * as React from 'react';
import { Helmet } from 'react-helmet-async';

/***
 * This file is a proposal to improve the SEO of the application.
 * Every page should contain its own tags in a different file. So the main file is not polluted with SEO tags.
 */
export const EpisodeTags = ({ podcast, episode }) => {
  return (
    <Helmet>
      <title> Episode </title>
      <meta
        name="description"
        content={`Listen to this episode of ${podcast?.title} . ${podcast?.description}.`}
      />
      <meta
        name="keywords"
        content={`podcast, ${podcast?.title}, [TODO-ADD-KEYWORDS]`}
      />
      <meta name="author" content={podcast?.author} />
      <meta property="og:image" content={podcast?.small_image} />
      <meta
        property="og:title"
        content={`${podcast?.title} - ${episode?.trackName}`}
      />
      <meta
        property="og:description"
        content={`Listen to this episode of ${podcast?.title} . ${podcast?.description}.`}
      />
    </Helmet>
  );
};
