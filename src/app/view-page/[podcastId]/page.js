'use client';

import { PropTypes } from 'prop-types';
import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getSinglePod } from '../../../api/podData';
import ViewPodcastCard from '../../../components/ViewEpisodeCard';
import { useAuth } from '../../../utils/context/authContext';

export default function ViewPage({ params }) {
  const [podcastDetails, setPodcastDetails] = useState({});

  const { podcastId } = params;
  const { user } = useAuth();

  const getPodInfo = () => {
    getSinglePod(podcastId, user.id).then(setPodcastDetails);
  };

  useEffect(() => {
    getPodInfo();
  }, [podcastId]);

  return (
    <div className="EpisodeListContainer">
      <div className="EpisodeList">
        {podcastDetails?.episodes?.map((episode) => (
          <ViewPodcastCard key={episode.id} episode={episode} podcastUser={podcastDetails?.user?.id} onUpdate={getPodInfo} idPodcast={podcastId} />
        ))}
      </div>

      {user.id === podcastDetails?.user?.id && (
        <Link href={`/view-page/${podcastId}/create-episode`} passHref>
          <Button>Upload Episode</Button>
        </Link>
      )}
    </div>
  );
}

ViewPage.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
