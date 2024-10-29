/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { deleteEpisode, toggleFavoriteEpisode } from '../api/episodeData';
import { useAuth } from '../utils/context/authContext';

function ViewPodcastCard({ episode, onUpdate, idPodcast, podcastUser }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  // const deleteThisPod = () => {
  //   if (window.confirm(`Delete ${podObj.title}?`)) {
  //     deletePod(podObj.firebaseKey).then(() => onUpdate());
  //   }
  // };

  const { user } = useAuth();

  const deleteThisEpisode = () => {
    if (window.confirm(`Delete ${episode.title}?`)) {
      deleteEpisode(episode.id).then(() => onUpdate());
    }
  };

  const doFav = () => {
    toggleFavoriteEpisode(episode.id, user.id).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '70%', margin: '10px' }}>
      <div className="mt-5 d-flex flex-wrap">
        <Card.Title> {episode.title} </Card.Title>
        <div className="d-flex flex-column">{episode.imageUrl !== '' ? <img src={episode.imageUrl} alt="" style={{ width: '240px' }} /> : <Image style={{ width: '6.5rem' }} src="/images/PODLOGO.png" />}</div>
        <div className="text-white ms-5 details" />

        <Card.Body> {episode.description} </Card.Body>
        <Card.Body>Uploaded on: {episode.createdOn}</Card.Body>
        {/* <p>Uploaded by: {episode.userId} </p> */}

        {/* {podcastDetails.favorite ? ' 🤍' : ''} */}
      </div>

      <div>
        <Button variant={episode?.favorited ? 'danger' : 'outline-danger'} onClick={doFav}>
          {episode?.favorited ? '⭐' : '❌'}
        </Button>
        {user.id === podcastUser && (
          <>
            <Link href={`/view-page/${idPodcast}/edit-episode/${episode.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>

            <Button variant="danger" onClick={deleteThisEpisode}>
              DELETE
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

ViewPodcastCard.propTypes = {
  episode: PropTypes.shape({
    podcastId: PropTypes.number,
    title: PropTypes.string,
    favorited: PropTypes.bool,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    createdOn: PropTypes.string,
    id: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  podcastUser: PropTypes.number.isRequired,
  idPodcast: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ViewPodcastCard;
