'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEpisode, updateEpisode } from '../../api/episodeData';

const initialState = {
  title: '',
  description: '',
  duration: 2024,
  imageUrl: '',
  favorite: false,
};

function EpisodeForm({ obj = initialState, podcastId }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
    console.log(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateEpisode(formInput).then(() => router.push(`/view-page/${podcastId}`));
    } else {
      const payload = { ...formInput, podcastId };
      createEpisode(payload).then((episode) => router.push(`/view-page/${episode.podcastId}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Episode</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Podcast Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Podcast Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Description" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Podcast Image" className="mb-3">
        <Form.Control type="text" placeholder="Enter Image Url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Podcast Duration" className="mb-3">
        <Form.Control type="number" placeholder="2024-01-01 00:00:00" name="duration" value={formInput.duration} onChange={handleChange} />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Episode</Button>
    </Form>
  );
}

EpisodeForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    iamgeUrl: PropTypes.string,
    favorite: PropTypes.bool,
  }),
  podcastId: PropTypes.number.isRequired,
};

export default EpisodeForm;
