/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PodCard from '../components/PodcastCard';
import { getPods } from '../api/podData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [pods, setPods] = useState([]);
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllPods = () => {
    getPods(user.id).then(setPods);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    // Delete when done
    // console.warn(user.id);
    getAllPods();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/pod/new" passHref>
        <Button>Add A Podcast</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-md-center">
        {pods.map((pod) => (
          <PodCard key={pod.id} podObj={pod} onUpdate={getAllPods} />
        ))}
      </div>
    </div>
  );
}

export default Home;
