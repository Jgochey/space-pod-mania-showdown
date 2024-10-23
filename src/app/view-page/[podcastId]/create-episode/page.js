import React from 'react';
import EpisodeForm from '@/components/forms/EpisodeForm';
import PropTypes from 'prop-types';

export default function AddEpisode({ params }) {
  const { podcastId } = params;
  return <EpisodeForm podcastId={podcastId} />;
}

AddEpisode.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
