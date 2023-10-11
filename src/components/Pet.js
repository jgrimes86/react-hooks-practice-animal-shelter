import React, {useState} from "react";

function Pet({pet, adoptAPet}) {
  const {id, age, gender, isAdopted, name, type, weight} = pet
  const [adoption, setAdoption] = useState(isAdopted)

  const genderIcon = (gender === "male") ? '♂' : '♀';
  const alreadyAdoptedClass = isAdopted ? "ui primary button" : "ui disabled button";
  const adoptPetClass = isAdopted ? "ui disabled button" : "ui primary button";

  function handleClick() {
    if(adoption === false) {
      setAdoption(true)
      fetch(`http://localhost:3001/pets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"isAdopted": true})
      })
      .then(response => response.json())
      .then(newData => adoptAPet(newData))
    }
  }

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {genderIcon}
          {name}
        </span>
        <div className="meta">
          <span className="date">{type}</span>
        </div>
        <div className="description">
          <p>Age: {age}</p>
          <p>Weight: {weight}</p>
        </div>
      </div>
      <div className="extra content">
        <button className={alreadyAdoptedClass}>Already adopted</button>
        <button className={adoptPetClass} onClick={handleClick}>Adopt pet</button>
      </div>
    </div>
  );
}

export default Pet;