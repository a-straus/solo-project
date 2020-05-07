import React, { useState, useEffect } from 'react';

export default function CreateDoorman() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [buildings, setBuildings] = useState([]);

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
    const response = await fetch('/api/doorman/create', {
      method: 'POST',
      body: data,
    });
    const resultData = await response.json();
    event.target.reset();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <span>
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
        {searchResults.length
          ? searchResults.map((building) => {
              return <p>{building.address}</p>;
            })
          : null}
        <button>Submit</button>
      </form>
    </span>
  );
}
