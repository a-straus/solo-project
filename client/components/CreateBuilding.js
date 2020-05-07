import React from 'react';

export default function CreateBuilding() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/api/building/create', {
      method: 'POST',
      body: data,
    });
    const resultData = await response.json();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address:</label>
        <input id="address" name="address" type="text" />
        <br />
        <label htmlFor="city">City:</label>
        <input id="city" name="city" type="text" />
        <br />
        <label htmlFor="state">State:</label>
        <input id="state" name="state" type="text" />
        <br />
        <label htmlFor="zip">Zip:</label>
        <input id="zip" name="zip" type="text" />
        <br />
        <select id="borough">
          <option value="Manhattan">Manhattan</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Queens">Queens</option>
          <option value="Bronx">Bronx</option>
          <option value="Staten Island">Staten Island</option>
        </select>
        <select id="type">
          <option value="co-op">Co-Op</option>
          <option value="condo">Condo</option>
        </select>
      </form>
    </div>
  );
}
