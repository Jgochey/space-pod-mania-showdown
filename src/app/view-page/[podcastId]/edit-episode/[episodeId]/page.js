'use client';

import React, { useEffect, useState } from 'react';
import EpisodeForm from '@/components/forms/EpisodeForm';
import PropTypes from 'prop-types';
import { getSingleEpisode } from '@/api/episodeData';
import { useAuth } from '../../../../../utils/context/authContext';

export default function UpdateEpisode({ params }) {
  const { episodeId } = params;
  const [editItem, setEditItem] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    getSingleEpisode(episodeId, user.id).then(setEditItem);
  }, [episodeId]);

  return <EpisodeForm obj={editItem} podcastId={editItem.podcastId} />;
}

UpdateEpisode.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
