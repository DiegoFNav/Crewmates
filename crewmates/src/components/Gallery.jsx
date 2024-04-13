import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Gallery({ classImages, supabase }) {
  // State variable to store the characters retrieved from the database
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  // Function to fetch characters from the Supabase database
  const fetchCharacters = async () => {
    try {
      // Make a query to fetch all characters from the 'Teammates' table
      const { data, error } = await supabase.from("Teammates").select("*");

      if (error) {
        throw error;
      }

      // Update the characters state with the fetched data
      setCharacters(data);
    } catch (error) {
      console.error("Error fetching characters:", error.message);
    }
  };

  // useEffect hook to fetch characters when the component mounts
  useEffect(() => {
    fetchCharacters();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleCardClick = (id) => {
    navigate(`/update/${id}`); // Navigate to the update page with the character ID as URL parameter
  };

  return (
    <div className="page gallery">
      <h1>Gallery</h1>
      <div className="gallery-container">
        {/* Map over the characters and create a card for each */}
        {characters.map((character) => (
          <div
            key={character.id}
            className="card"
            onClick={() => handleCardClick(character.id)} // Handle click event on the card
          >
            <div className="card-img-container">
              <img
                src={classImages[character.class]}
                alt={character.class}
                className="card-image"
              />
            </div>
            <div className="card-details">
              <h2>{character.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;