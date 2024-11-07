/* eslint-disable prefer-const */

'use client';

import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import { getGenres, getSingleGenres } from '../../api/genreData';
import { useAuth } from '../../utils/context/authContext';
import { getShowdown, showdownResults } from '../../api/showdownData';
import ShowdownCard from '../../components/ShowdownCard';

export default function ShowdownPage() {
  const [tempList, setTempList] = useState([{}]);
  const [genredata, genreChosen] = useState('');
  const [pods, setPods] = useState([]);
  const { user } = useAuth();

  const getAllGenres = () => {
    getGenres().then(setTempList);
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  const setGenreId = (genreId) => {
    getSingleGenres(genreId, user.id);
  };

  const submitClick = (genreId, genreName) => {
    setGenreId(genreId);
    console.warn(genreId, user.id);
    getShowdown(genreId, user.id).then(setPods);
    genreChosen(genreName);
  };
  // showdownResults(payload).then(setResults);

  const win = (winningPodcastId) => {
    const lose = pods[1].id !== winningPodcastId ? pods[1].id : pods[0].id;
    const payload = { winningPodcastId, losingPodcastId: lose, userId: user.id };
    showdownResults(payload).then(() => getShowdown(pods[0].genreId, user.id).then(setPods));
  };

  return (
    <div>
      <div className="showdownVS">
        <Image style={{ width: '15rem' }} src="/images/SHOWDOWNVS.png" />
      </div>
      <div className="showdownText">
        <div className="showdownTopText">
          <h1 style={{ color: 'white' }}>Welcome to Showdown! Select A Genre!</h1>
        </div>
        <div className="showdownBottomText">
          <h5 style={{ color: 'white' }}>Two Podcasts will go head to head and You decide which one You enjoy more!</h5>
        </div>
      </div>
      <div className="showdownGenres">
        <Dropdown>
          <div className="genreSelector">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose a Genre
            </Dropdown.Toggle>
          </div>

          <Dropdown.Menu>
            <div className="d-flex flex-wrap justify-content-md-center">
              {tempList.map((genre) => (
                // GIVE DATA
                <Dropdown.Item onClick={() => submitClick(genre.id, genre.name)}> {genre.name} </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <h5 className="currentGenre">Current Genre: {genredata === '' ? 'No Genre Selected' : genredata}</h5>
      </div>
      <div className="showdownCards">{pods === 'There are not enough podcasts in this genre.' || pods === 'All Podcasts from this Genre have been voted on' ? <h1 style={{ color: 'yellow' }}>No Podcasts avaliable in this Genre</h1> : pods?.map((pod) => <ShowdownCard voteForPodcast={win} podObj={pod} />)}</div>
    </div>
  );
}
