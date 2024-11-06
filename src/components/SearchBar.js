import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function SearchBar({ favorite = false }) {
  const [formInput, setFormInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (formInput !== '') {
      if (favorite !== true) {
        router.push(`/search/${formInput}`);
      } else {
        router.push(`/favSearch/${formInput}`);
      }
    }
  };

  return (
    <Form className="d-flex text search-bar" onSubmit={handleSearch}>
      <Form.Control type="search" placeholder="Search Podcasts" className="me-2" style={{ border: 'none', width: '25rem' }} aria-label="Search" name="search" onChange={handleChange} />
    </Form>
  );
}

SearchBar.propTypes = {
  favorite: PropTypes.bool,
};
