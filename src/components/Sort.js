/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { getGenres } from '../api/genreData';
import { useAuth } from '../utils/context/authContext';

export default function Sort({ singleGenreId, allPods }) {
  const [tempList, setTempList] = useState([{}]);
  const { user } = useAuth();

  //   const fetchData=()=>{
  //     fetch('https://dummyjson.com/users')
  //     .then(res => res.json())
  //     .then(json => setTempList(json.users)).catch(e => {
  //       console.log("error", e)
  //   })
  // }

  const getAllGenres = () => {
    getGenres().then(setTempList);
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  // const ascendingEvent = () => {
  //   let data = [...tempList]
  //   if (data.length > 0) {
  //     let result = data.sort((a,b) => a.name.localeCompare(b.name))
  //     setTempList(result)
  //   }
  // }

  // const decendingEvent = () => {
  //   let data = [...tempList]
  //   if (data.length > 0) {
  //     let result = data.sort((a,b) => b.name.localeCompare(a.name))
  //     setTempList(result)
  //   }
  // }

  const submitClick = (genreId) => {
    singleGenreId(genreId);
    console.warn(genreId, user.id);
  };

  return (
    <div>
      {/* {  
      // eslint-disable-next-line no-unused-vars
      tempList && tempList.length > 0 && tempList !== undefined ? tempList.map((item, i) => (
        <div>{item.name}</div>
        )) : "No data"
    } */}

      {/* <Button onClick={ascendingEvent}> Ascending </Button>
      <Button onClick={decendingEvent}> Decending </Button>
      <Button onClick={getAllGenres}> Previous Data </Button> */}

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort by Genre
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* <Dropdown.Item href={`genres/${genre.Id}`}>Action</Dropdown.Item> */}
          {/* <Dropdown.Item href={`genres/${tempList.Id}`}> True Crime </Dropdown.Item> */}

          <div>
            <Dropdown.Item onClick={() => allPods()}>All Podcasts</Dropdown.Item>
            {tempList.map((genre) => (
              // GIVE DATA
              <Dropdown.Item onClick={() => submitClick(genre.id)}> {genre.name} </Dropdown.Item>
            ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

Sort.propTypes = {
  // genres: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //   }),
  // ),
  singleGenreId: PropTypes.func.isRequired,
  allPods: PropTypes.func.isRequired,
};
