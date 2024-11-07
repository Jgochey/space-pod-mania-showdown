'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ShowdownCard({ podObj, voteForPodcast }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={podObj.imageUrl} alt={podObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{podObj.title}</Card.Title>
        <Card.Title>{podObj.description}</Card.Title>
        <Button variant="success" className="m-2" onClick={() => voteForPodcast(podObj.id)}>
          WINNER
        </Button>
      </Card.Body>
    </Card>
  );
}

ShowdownCard.propTypes = {
  voteForPodcast: PropTypes.func.isRequired,
  podObj: PropTypes.shape({
    description: PropTypes.string,
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
};

export default ShowdownCard;
