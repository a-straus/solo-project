import React from 'react';

export default function Doorman({
  id,
  firstname,
  lastname,
  super: superIntendent,
  night,
  rating,
  speciality,
  strength,
  endurance,
  cunning,
  charisma,
  canDelete,
}) {
  return (
    <div className="doorman-view">
      <p>
        <strong>Doorman</strong>
      </p>
      {superIntendent ? <h4>Super? YES</h4> : null}
      <p>First Name: {firstname}</p>
      <p>Last Name: {lastname}</p>
      <p>Night Man? {night ? 'Yes' : 'No'}</p>
      <p>Rating: {rating}</p>
      <p>Speciality: {speciality}</p>
      <p>Strength: {strength}</p>
      <p>Endurance: {endurance}</p>
      <p>Cunning: {cunning}</p>
      <p>Charisma: {charisma}</p>
      {canDelete ? <button>Delete</button> : null}
    </div>
  );
}
