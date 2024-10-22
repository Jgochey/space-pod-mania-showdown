'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

//  ⭐

function ViewPodcastCard({ episode }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  // const deleteThisPod = () => {
  //   if (window.confirm(`Delete ${podObj.title}?`)) {
  //     deletePod(podObj.firebaseKey).then(() => onUpdate());
  //   }
  // };

  return (
    <Card style={{ width: '70%', margin: '10px' }}>
      <div className="mt-5 d-flex flex-wrap">
        <Card.Title> {episode.title} </Card.Title>
        {/* <div className="d-flex flex-column">
  <img src={podcastDetails.imageURL} alt={podcastDetails.title} style={{ width: '240px' }} />
</div> */}
        <div className="text-white ms-5 details" />

        <Card.Body> {episode.description} </Card.Body>
        <Card.Body>Uploaded on: {episode.createdOn}</Card.Body>
        {/* <p>Uploaded by: {episode.userId} </p> */}

        {/* {podcastDetails.favorite ? ' 🤍' : ''} */}
      </div>
    </Card>
  );
}

ViewPodcastCard.propTypes = {
  episode: PropTypes.shape({
    title: PropTypes.string,
    favorited: PropTypes.bool,
    description: PropTypes.string,
    createdOn: PropTypes.string,
    episodes: PropTypes.number,
    id: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default ViewPodcastCard;
