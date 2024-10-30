import React from 'react';
import { PropTypes } from 'prop-types';
import PodcastForm from '../../../components/forms/PodcastForm';

export default function AddPodcast({ params }) {
  const { podcastId } = params;
  return <PodcastForm podcastId={podcastId} />;
}

AddPodcast.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
