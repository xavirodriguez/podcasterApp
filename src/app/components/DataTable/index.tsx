/**
 *
 * DataTable
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Track } from 'types/Track';

import UnstyledLink from '../Styled/UnstyledLink';
import DataCell from './DataCell';
import { messages } from './messages';
import Row from './Row';
import TitleCell from './TitleCell';

interface Props {
  collectionId: string;
  tracks: Track[];
}

export function DataTable(props: Props) {
  const { t } = useTranslation();
  const formatTrackDuration = trackTimeMillis => {
    const trackDurationInSeconds = Math.floor(trackTimeMillis / 1000);
    const minutes = Math.floor(trackDurationInSeconds / 60);
    const secondsRaw = trackDurationInSeconds % 60;
    const seconds = secondsRaw < 10 ? `0${secondsRaw}` : secondsRaw;

    return `${minutes}:${seconds}`;
  };
  const { tracks, collectionId } = props;

  return (
    <>
      <Row isFirst={true}>
        <TitleCell>{t(messages.title())}</TitleCell>
        <DataCell>{t(messages.date())}</DataCell>
        {tracks[0].trackTimeMillis && (
          <DataCell align="right">{t(messages.duration())}</DataCell>
        )}
      </Row>
      {tracks.map((track, index) => (
        <UnstyledLink
          key={track.trackName}
          to={`/podcast/${collectionId}/episode/${index}`}
        >
          <Row isOdd={index % 2 === 1}>
            <TitleCell>{track.trackName}</TitleCell>
            <DataCell>
              {new Date(track.releaseDate).toLocaleDateString()}
            </DataCell>
            {track.trackTimeMillis && (
              <DataCell align="right">
                {formatTrackDuration(track.trackTimeMillis)}
              </DataCell>
            )}
          </Row>
        </UnstyledLink>
      ))}
    </>
  );
}
