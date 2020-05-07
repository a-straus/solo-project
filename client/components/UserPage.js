import React, { useState, useEffect } from 'react';
import CreateDoorman from './CreateDoorman';
import CreateBuilding from './CreateBuilding';
import Doorman from './Doorman';

export default function UserPage({ userId }) {
  const [userBuildings, setUserBuildings] = useState([]);
  const [userDoormen, setUserDoormen] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching doormen');
      const queryString = `?user_id=${userId}`;
      const result = await fetch(`/api/user/doormen/${queryString}`);
      const doormen = await result.json();
      setUserDoormen(doormen);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div id="creatorWrapper">
          <CreateDoorman userId={userId} />
          <CreateBuilding userId={userId} />
        </div>
        <div id="userCreated">
          {userDoormen.map((doorman) => {
            return (
              <Doorman
                firstname={doorman.firstname}
                lastname={doorman.lastname}
                night={doorman.night}
                rating={doorman.rating}
                speciality={doorman.speciality}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
