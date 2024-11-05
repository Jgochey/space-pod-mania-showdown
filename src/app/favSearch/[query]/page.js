/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PodCard from '../../../components/PodcastCard';
import { useAuth } from '../../../utils/context/authContext';
import SearchBar from '../../../components/SearchBar';
import { getFavoriteSearch } from '../../../api/searchData';
// import Sort from '../components/Sort';
// import { getSingleGenres } from '../api/genreData';

function SearchHome({ params }) {
  const { query } = params;
  const [pods, setPods] = useState([]);
  const { user } = useAuth();

  const getSearchPod = () => {
    if (query) {
      getFavoriteSearch(query, user.id).then(setPods);
    }
  };

  useEffect(() => {
    getSearchPod();
  }, []);

  // const setGenreId = (genreId) => {
  //   getSingleGenres(genreId, user.id).then(setPods);
  // };

  return (
    <div className="text-center my-4">
      <div className="searchBar">
        <SearchBar />
      </div>
      <Link href="/pod/new" passHref>
        <Button>Add A Podcast</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-md-center">{pods === `${query} is not found!` ? <h1>No Podcasts</h1> : pods?.map((pod) => <PodCard key={pod.id} podObj={pod} podcastUser={pod?.user?.id} onUpdate={getSearchPod} />)}</div>
    </div>
  );
}

export default SearchHome;

SearchHome.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
