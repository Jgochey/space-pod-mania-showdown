'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deletePod, toggleFavoritePod } from '../api/podData';
import { useAuth } from '../utils/context/authContext';

function PodCard({ podObj, onUpdate, podcastUser }) {
  const { user } = useAuth();

  const deleteThisPodcast = () => {
    if (window.confirm(`Delete ${podObj.title}?`)) {
      deletePod(podObj.id).then(() => onUpdate());
    }
  };

  const doFav = () => {
    toggleFavoritePod(podObj.id, user.id).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={podObj.imageUrl} alt={podObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{podObj.title}</Card.Title>
        <Card.Title>{podObj.genre.name}</Card.Title>
        {/* {podObj.genres.map((genre) => (
          <p key={genre.id}>{genre.name}</p>
        ))} */}
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`view-page/${podObj.id}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>

        {user.id === podcastUser && (
          <>
            <Link href={`pod/edit/${podObj.id}`} passHref>
              <Button variant="primary" className="m-2">
                EDIT
              </Button>
            </Link>
            <Button variant="danger" onClick={deleteThisPodcast}>
              DELETE
            </Button>
          </>
        )}

        <Button variant={podObj.favorite ? 'danger' : 'outline-danger'} onClick={doFav}>
          {podObj.favorite ? '⭐' : '❌'}
        </Button>
      </Card.Body>
    </Card>
  );
}

PodCard.propTypes = {
  podcast: PropTypes.shape({
    imageUrl: PropTypes.string,
  }),

  podObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    favorite: PropTypes.bool,
    title: PropTypes.string,
    userId: PropTypes.string,
    id: PropTypes.number,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  podcastUser: PropTypes.number.isRequired,
};

export default PodCard;
