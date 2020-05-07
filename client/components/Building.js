import React from 'react';

export default function Building({ id, borough, address, type, city, state, postalcode: zip }) {
  return (
    <div>
      <h4>Address: {address}</h4>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Zip Code: {zip}</p>
      <p>Type: {type}</p>
    </div>
  );
}
