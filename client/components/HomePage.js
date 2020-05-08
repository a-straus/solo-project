import React, { useState, useEffect } from 'react';

export default function HomePage() {
  // const [buildings, setBuildings] = useState([]);
  // const [doormen, setDoormen] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log('fetching doormen');
  //     const result = await fetch(`/api/doorman/`);
  //     const doormen = await result.json();
  //     console.log(doormen);
  //     setDoormen(doormen);
  //     const result2 = await fetch(`/api/building/`);
  //     const buildings = await result2.json();
  //     setBuildings(buildings);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div id="homepage">
      <h1>Rate My Doorman!</h1>
    </div>
  );
}
