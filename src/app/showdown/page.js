/* eslint-disable prefer-const */

'use client';

import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import PropTypes from 'prop-types';
import { getGenres, getSingleGenres } from '../../api/genreData';
import { useAuth } from '../../utils/context/authContext';
import { getShowdown, showdownResults } from '../../api/showdownData';
import ShowdownCard from '../../components/ShowdownCard';

export default function ShowdownPage() {
  const [tempList, setTempList] = useState([{}]);
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

  const submitClick = (genreId) => {
    setGenreId(genreId);
    console.warn(genreId, user.id);
    getShowdown(genreId, user.id).then(setPods);
  };
  // showdownResults(payload).then(setResults);

  const win = (winningPodcastId) => {
    const lose = pods[1].id !== winningPodcastId ? pods[1].id : pods[0].id;
    const payload = { winningPodcastId, losingPodcastId: lose, userId: user.id };
    showdownResults(payload).then(() => getShowdown(pods[0].genreId, user.id).then(setPods));
  };

  return (
    <div>
      <div className="showdownGenres">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose A Genre
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div>
              {tempList.map((genre) => (
                // GIVE DATA
                <Dropdown.Item onClick={() => submitClick(genre.id)}> {genre.name} </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="showdownCards">{pods === 'There are not enough podcasts in this genre.' || pods === 'All Podcasts from this Genre have been voted on' ? <h1>No Podcasts Left Avaliable in This Genre</h1> : pods?.map((pod) => <ShowdownCard voteForPodcast={win} podObj={pod} />)}</div>
    </div>
  );
}
