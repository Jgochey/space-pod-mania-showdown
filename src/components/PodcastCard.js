'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { toggleFavoritePod } from '../api/podData';
import { useAuth } from '../utils/context/authContext';

function PodCard({ podObj, onUpdate }) {
  const { user } = useAuth();
  const doFav = () => {
    toggleFavoritePod(podObj.id, user.id).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={podObj.imageUrl} alt={podObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{podObj.title}</Card.Title>
        {podObj.genres.map((genre) => (
          <p key={genre.id}>{genre.name}</p>
        ))}
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`view-page/${podObj.id}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Button variant={podObj.favorite ? 'danger' : 'outline-danger'} onClick={doFav}>
          {podObj.favorite ? '⭐' : '❌'}
        </Button>
      </Card.Body>
    </Card>
  );
}

PodCard.propTypes = {
  podObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    favorite: PropTypes.bool,
    title: PropTypes.string,
    userId: PropTypes.string,
    id: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PodCard;
