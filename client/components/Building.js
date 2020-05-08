import React from 'react';

export default function Building({
  id,
  borough,
  address,
  type,
  city,
  state,
  postalcode: zip,
  canDelete,
}) {
  return (
    <div className="building-view">
      <p>
        <strong>Building</strong>
      </p>
      <p>Address: {address}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Zip Code: {zip}</p>
      <p>Type: {type}</p>
      {canDelete ? <button>Delete</button> : null}
    </div>
  );
}
