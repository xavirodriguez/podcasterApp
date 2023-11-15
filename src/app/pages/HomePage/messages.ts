/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  description: () =>
    _t(
      translations.description,
      'Podcaster is a site where you can listen to TOP100 online streams',
    ),
  loading: () => _t(translations.loading, 'Loading...'),
  author: () => _t(translations.details.author, 'Author'),
  filter: () => _t(translations.homepage.filter, 'Filter by title or author'),
};
