/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { PageHeader } from './components/PageHeader';
import EpisodePage from './pages/EpisodePage';
import { HomePage } from './pages/HomePage/Loadable';
import { PodcastPage } from './pages/PodcastPage';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="Podcaster"
        defaultTitle="Podcaster"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Podcaster App" />
      </Helmet>
      <PageHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast/:id" element={<PodcastPage />} />
        <Route path="/podcast/:id/episode/:trackId" element={<EpisodePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
