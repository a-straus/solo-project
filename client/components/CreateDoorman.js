import React, { useState, useEffect, useReducer } from 'react';

export default function CreateDoorman({ userId }) {
  function reducer(buildings, action) {
    console.log('buildings: ', buildings);
    console.log('action payload: ', action.payload);
    switch (action.type) {
      case 'add_building':
        const newBuildings = [...buildings].concat(action.payload);
        console.log('new buildings: ', newBuildings);
        return newBuildings;
      default:
        return buildings;
    }
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        const queryString = `?address=${searchTerm}`;
        const results = await fetch(`/api/building/${queryString}`);
        const data = await results.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append('buildings', [...state.map((building) => building.id)]);
    data.append('user_id', userId);
    const response = await fetch('/api/doorman/create', {
      method: 'POST',
      body: data,
    });
    //const resultData = await response.json();
    event.target.reset();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addBuilding = (id) => {};

  return (
    <span className="doorman-creator">
      <h4>Create a Doorman:</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input id="firstname" name="firstname" type="text" />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input id="lastname" name="lastname" type="text" />
        <br />
        <span>Super? </span>
        <select id="super" name="super">
          <option value="false" selected="selected">
            No
          </option>
          <option value="true">Yes</option>
        </select>
        <span> Nightman? </span>
        <select id="night" name="night">
          <option value="false" selected="selected">
            No
          </option>
          <option value="true">Yes</option>
        </select>
        <br />
        <label htmlFor="speciality">Speciality:</label>
        <input id="speciality" name="speciality" type="text" />
        <br />
        <span>Add Buildings: </span>
        <input
          type="text"
          placeholder="Address:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <br />
        <div>
          {state.map((building) => {
            {
              console.log('building from state: ', building);
            }
            return <h6>{building.address}</h6>;
          })}
        </div>
        {searchResults.length ? (
          <div id="building-search">
            {searchResults.map((building) => {
              return (
                <p onClick={() => dispatch({ type: 'add_building', payload: building })}>
                  {building.address}
                </p>
              );
            })}
          </div>
        ) : null}
        <button>Submit</button>
      </form>
    </span>
  );
}
