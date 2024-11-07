'use client';

import { PropTypes } from 'prop-types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'react-bootstrap/Image';
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
    <div>
      <div className="viewpageTitle">
        <h1 style={{ color: 'white' }}>{podcastDetails.title}</h1>
      </div>
      <div className="showdownVotes">
        <div className="upvotes">
          <h2>↑</h2>
        </div>
        <h2 style={{ color: 'white' }}>{podcastDetails.showdownWins}</h2>
        <div className="viewpageDownvotes">
          <h2>↓</h2>
        </div>
        <h2 style={{ color: 'white' }}>{podcastDetails.showdownLosses}</h2>
      </div>
      <div className="viewPageImage">
        <Image variant="top" src={podcastDetails.imageUrl} alt={podcastDetails.description} style={{ height: '400px' }} />
      </div>
      <div className="viewpageEpisodeText">
        <h4 style={{ color: 'white' }}>{podcastDetails.title} Episodes</h4>
      </div>
      <div className="EpisodeListContainer">
        <div className="EpisodeList">
          {podcastDetails?.episodes?.map((episode) => (
            <ViewPodcastCard key={episode.id} episode={episode} podcastUser={podcastDetails?.user?.id} onUpdate={getPodInfo} idPodcast={podcastId} />
          ))}
        </div>
        <div className="uploadBtn">
          {user.id === podcastDetails?.user?.id && (
            <Link href={`/view-page/${podcastId}/create-episode`} passHref>
              <Button>Upload Episode</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

ViewPage.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
