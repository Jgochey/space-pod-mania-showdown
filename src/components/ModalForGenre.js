import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function ModalForGenre({ genres, singleGenreId }) {
  const [list, setList] = useState(false);

  const handleClose = () => setList(false);
  const handleList = () => setList(true);

  const submitClick = (genreId) => {
    singleGenreId(genreId);
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleList}>
        Genres
      </Button>
      <Modal show={list} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="genreTitle">Pick Your Podcast&apos;s Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {genres.map((genre) => (
            // GIVE DATA
            <Button className="genreModalList" variant="success" onClick={() => submitClick(genre.id)}>
              {genre.name}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
ModalForGenre.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  singleGenreId: PropTypes.func.isRequired,
};

export default ModalForGenre;
