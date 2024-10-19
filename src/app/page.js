/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PodCard from '../components/PodcastCard';
import { getPods } from '../api/podData';

function Home() {
  const [pods, setPods] = useState([]);

  // TODO: create a function that makes the API call to get all the books
  const getAllPods = () => {
    getPods(1).then(setPods);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
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
