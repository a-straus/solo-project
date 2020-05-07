import React from 'react';

export default function Doorman({
  id,
  name,
  super: superIntendent,
  night,
  rating,
  speciality,
  strength,
  endurance,
  cunning,
  charisma,
}) {
  return (
    <div>
      {superIntendent ? <h4>Super? YES</h4> : null}
      <p className={}>Name: {name}</p>
      <p>Night Man? {night ? 'Yes' : 'No'}</p>
      <p>Rating: {rating}</p>
      <p>Speciality: {speciality}</p>
      <p>Strenght: {strength}</p>
      <p>Endurance: {endurance}</p>
      <p>Cunning: {cunning}</p>
      <p>Charisma: {charisma}</p>
    </div>
  );
}
