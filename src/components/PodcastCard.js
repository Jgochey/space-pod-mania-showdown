'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

//  ⭐

function PodCard({ podObj }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  // const deleteThisPod = () => {
  //   if (window.confirm(`Delete ${podObj.title}?`)) {
  //     deletePod(podObj.firebaseKey).then(() => onUpdate());
  //   }
  // };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={podObj.imageUrl} alt={podObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{podObj.title}</Card.Title>
        {podObj.genres.map((genre) => (
          <p key={genre.id}>{genre.name}</p>
        ))}
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/${podObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Button variant={podObj.favorited ? 'outline-danger' : 'danger'}>{podObj.favorited ? '❌' : '⭐'}</Button>
        {/* <Button variant="danger" onClick={deleteThisBook} className="m-2">
          DELETE
        </Button> */}
      </Card.Body>
    </Card>
  );
}

PodCard.propTypes = {
  podObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    favorited: PropTypes.bool,
    title: PropTypes.string,
    userID: PropTypes.string,
    firebaseKey: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default PodCard;
