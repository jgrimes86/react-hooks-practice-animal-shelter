import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [petSelection, setPetSelection] = useState([])

  const petAPI = "http://localhost:3001/pets"

  useEffect(() => {
    fetch(petAPI)
    .then(response => response.json())
    .then(petData => setPets(petData))
  }, [])

  function adoptAPet(newData) {
    setPets(pets.map((pet) => {
      if (pet.id === newData.id) {
        return newData
      } else {return pet}
    }))
  }

  function filterChange(newFilter) {
    setFilters({type : newFilter})
  }

  function showFilteredPets() {
    setPetSelection(pets.filter((pet) => {
      if (pet.type === filters.type) {
        return pet
      }
    }))
  }

  const displayedPets = (petSelection.length > 0) ? petSelection : pets;

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filterChange={filterChange} showFilteredPets={showFilteredPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={displayedPets} adoptAPet={adoptAPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;