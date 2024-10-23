import React from 'react';
import EpisodeForm from '@/components/forms/EpisodeForm';
import PropTypes from 'prop-types';

export default function UpdateEpisode({ params }) {
  const { podcastId } = params;

  return <EpisodeForm podcastId={podcastId} />;
}

UpdateEpisode.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
