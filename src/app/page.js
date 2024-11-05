/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PodCard from '../components/PodcastCard';
import { getPods } from '../api/podData';
import { useAuth } from '../utils/context/authContext';
import Sort from '../components/Sort';
import { getSingleGenres } from '../api/genreData';

function Home() {
  const [pods, setPods] = useState([]);
  const { user } = useAuth();

  const getAllPods = () => {
    getPods(user.id).then(setPods);
  };

  useEffect(() => {
    getAllPods();
  }, []);

  const setGenreId = (genreId) => {
    getSingleGenres(genreId, user.id).then(setPods);
  };

  return (
    <div className="text-center my-4">
      <Sort singleGenreId={setGenreId} allPods={getAllPods} />
      <Link href="/pod/new" passHref>
        <Button>Add A Podcast</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-md-center">{pods === 'There are no podcast with the genreId.' ? <h1>No Podcasts</h1> : pods?.map((pod) => <PodCard key={pod.id} podObj={pod} podcastUser={pod?.user?.id} onUpdate={getAllPods} />)}</div>
    </div>
  );
}

export default Home;
