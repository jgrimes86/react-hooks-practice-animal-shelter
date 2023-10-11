import React from "react";

import Pet from "./Pet";

function PetBrowser({pets, adoptAPet}) {

  const petDisiplay = pets.map((pet) => {
    return <Pet key={pet.id} pet={pet} adoptAPet={adoptAPet} />
  })

  return <div className="ui cards">{petDisiplay}</div>;
}

export default PetBrowser;