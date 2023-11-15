import { Podcast } from 'types/Podcast';

const INFO_URL: string =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const EPISODES_URL: string =
  'https://itunes.apple.com/lookup?media=podcast&entity=podcastEpisode&limit=20';

export const fetchPodcasts = async () => {
  try {
    const response = await fetch(INFO_URL);

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();
    const sanitizedData: Podcast[] = data.feed.entry.map(entry => ({
      id: entry.id.attributes['im:id'],
      title: entry['im:name']?.label || 'Título no disponible',
      author: entry['im:artist']?.label || 'Autor no disponible',
      url: entry.link[0]?.attributes.href || '#',
      small_image: entry['im:image'][2].label,
      description: entry.summary?.label || 'Descripción no disponible',
    }));

    return sanitizedData;
  } catch (error) {
    console.error(error);
  }
};
export const fetchTracksById = async (id: string) => {
  const apiUrlwithId = `${EPISODES_URL}&id=${id}`;
  const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
    apiUrlwithId,
  )}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const contents = JSON.parse(data.contents);

      contents.results.shift();
      /*
      const firstElement = contents.results.shift() || {
        artistName: 'Unknown',
        artworkUrl600: '',
        collectionName: 'Unknown',
      };
      */

      const tracks = contents.results.map(
        (result: {
          trackName: string;
          releaseDate: string;
          episodeUrl: string;
          description: string;
          trackTimeMillis: number;
        }) => ({
          trackName: result.trackName,
          releaseDate: result.releaseDate,
          episodeUrl: result.episodeUrl,
          description: result.description,
          trackTimeMillis: result.trackTimeMillis,
        }),
      );

      return tracks;
    });
};
