/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  // someThing: () => _t(translations.someThing,'default value'),
  trackNotFound: () => _t(translations.trackNotFound, 'Track not found'),
  errorLoadingTrack: () =>
    _t(translations.errorLoadingTrack, 'Error loading track'),
  errorButDownload: () =>
    _t(
      translations.errorButDownload,
      'An error happend while loading the track, but you can download it or try it again',
    ),
  tryAgain: () => _t(translations.tryAgain, 'Try again'),
  download: () => _t(translations.download, 'Download'),
};
