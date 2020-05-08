import React, { useState, useEffect } from 'react';
import CreateDoorman from './CreateDoorman';
import CreateBuilding from './CreateBuilding';
import Doorman from './Doorman';
import Building from './Building';

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
      const result2 = await fetch(`/api/user/buildings/${queryString}`);
      const buildings = await result2.json();
      setUserBuildings(buildings);
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
        <div className="user-created">
          {userDoormen.map((doorman) => {
            return (
              <Doorman
                firstname={doorman.firstname}
                lastname={doorman.lastname}
                night={doorman.night}
                rating={doorman.rating}
                speciality={doorman.speciality}
                canDelete={true}
              />
            );
          })}
          {userBuildings.map((building) => {
            return (
              <Building
                address={building.address}
                city={building.city}
                state={building.state}
                zip={building.postalcode}
                type={building.type}
                canDelete={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
