'use client';

import { PropTypes } from 'prop-types';
import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getSinglePod } from '../../../api/podData';
import ViewPodcastCard from '../../../components/ViewEpisodeCard';
// import { deleteEpisode } from '../../../api/episodeData';

export default function ViewPage({ params }) {
  const [podcastDetails, setPodcastDetails] = useState({});

  const { podcastId } = params;

  const getPodInfo = () => {
    getSinglePod(podcastId, 2).then(setPodcastDetails);
  };

  useEffect(() => {
    getPodInfo();
  }, [podcastId]);

  return (
    <div className="EpisodeListContainer">
      <div className="EpisodeList">
        {podcastDetails?.episodes?.map((episode) => (
          <ViewPodcastCard key={episode.id} episode={episode} onUpdate={getPodInfo} />
        ))}
      </div>

      <Link href={`/view-page/${podcastId}/create-episode`} passHref>
        <Button>Upload Episode</Button>
      </Link>
    </div>
  );
}

ViewPage.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
