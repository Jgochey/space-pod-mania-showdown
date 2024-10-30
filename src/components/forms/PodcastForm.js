'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPod, updatePod } from '../../api/podData';

const initialState = {
  title: '',
  description: '',
  imageUrl: '',
  genreId: 2,
};

function PodcastForm({ obj = initialState, podcastId }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput({ ...obj, genreId: obj.genre.id });
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
      updatePod({ ...formInput, podcastId }).then(() => router.push(`/`));
    } else {
      const payload = { ...formInput, userId: user.id };
      createPod(payload).then(() => router.push(`/`));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Podcast</h2>

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

      {/* GENRE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Podcast Genre" className="mb-3">
        <Form.Control type="text" placeholder="Enter Podcast Genre" name="genreId" value={formInput.genreId} onChange={handleChange} />
      </FloatingLabel>
      {/* Change Genre input to Genre names instead of entering a number. */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Podcast </Button>
    </Form>
  );
}

PodcastForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.number,
    genreId: PropTypes.number,
  }),
  podcastId: PropTypes.number.isRequired,
};

export default PodcastForm;
