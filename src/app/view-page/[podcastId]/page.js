'use client';

import { PropTypes } from 'prop-types';
import { React, useState, useEffect } from 'react';
import { getSinglePod } from '../../../api/podData';
import ViewPodcastCard from '../../../components/ViewEpisodeCard';

export default function ViewPage({ params }) {
  const [podcastDetails, setPodcastDetails] = useState({});

  const { podcastId } = params;

  useEffect(() => {
    getSinglePod(podcastId, 2).then(setPodcastDetails);
  }, [podcastId]);

  return (
    <div className="EpisodeListContainer">
      <div className="EpisodeList">
        {podcastDetails?.episodes?.map((episode) => (
          <ViewPodcastCard key={episode.id} episode={episode} />
        ))}
      </div>

      <button className="btn btn-danger" type="button" onClick={() => console.log('Episode Uploaded')}>
        {' '}
        Upload{' '}
      </button>
    </div>
  );
}

ViewPage.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
