import { i18n } from '../i18n';

describe('i18n', () => {
  it('should initiate i18n', async () => {
    const t = await i18n;

    expect(t).toBeDefined();
  });
});
describe('i18n', () => {
  it('should translate one element', async () => {
    const t = await i18n;

    expect(t('title')).toBe('Podcaster');
  });
});
