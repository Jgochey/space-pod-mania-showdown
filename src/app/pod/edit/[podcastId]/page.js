'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSinglePod } from '../../../../api/podData';
import { useAuth } from '../../../../utils/context/authContext';
import PodcastForm from '../../../../components/forms/PodcastForm';

export default function UpdatePodcast({ params }) {
  const { podcastId } = params;
  const [editItem, setEditItem] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    getSinglePod(podcastId, user.id).then(setEditItem);
  }, [podcastId]);

  return <PodcastForm obj={editItem} podcastId={editItem.podcastId} />;
}

UpdatePodcast.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
