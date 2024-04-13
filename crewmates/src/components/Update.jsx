import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Update({ classImages, classStats, supabase }) {
  const { id } = useParams(); // Extract the character ID from the URL parameter
  const [character, setCharacter] = useState(null); // State variable to store the character data
  const [editedCharacter, setEditedCharacter] = useState(null); // State variable to store edited character data
  const [characterImage, setCharacterImage] = useState(""); // State variable to store the character image URL

  // Function to fetch the character from the Supabase database
  const fetchCharacter = async () => {
    try {
      // Make a query to fetch the character with the specified ID from the 'Teammates' table
      const { data, error } = await supabase
        .from("Teammates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      // Update the character state with the fetched data
      setCharacter(data);
      // Set the editedCharacter state to the fetched data initially
      setEditedCharacter(data);
      // Set the character image URL based on the fetched character's class
      setCharacterImage(classImages[data.class]);
    } catch (error) {
      console.error("Error fetching character:", error.message);
    }
  };

  // useEffect hook to fetch the character when the component mounts or when the character ID changes
  useEffect(() => {
    fetchCharacter();
  }, [id]); // Dependency array includes id to re-fetch character when it changes

  // useEffect hook to update the character image when the edited character's class changes
  useEffect(() => {
    if (editedCharacter) {
      // Update the character image URL based on the edited character's class
      setCharacterImage(classImages[editedCharacter.class]);
    }
  }, [editedCharacter]); // Dependency array includes editedCharacter to watch for changes

  // Function to handle changes in the edited character data
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    // Update the editedCharacter state with the new value
    setEditedCharacter({ ...editedCharacter, [name]: value });
  };

  // Function to update the character data in the Supabase database
  const handleUpdateCharacter = async () => {
    try {
      // Make a query to update the character data in the 'Teammates' table
      const { error } = await supabase
        .from("Teammates")
        .update(editedCharacter)
        .eq("id", id);

      if (error) {
        throw error;
      }

      // If update is successful, update the character state with the edited character data
      setCharacter(editedCharacter);
    } catch (error) {
      console.error("Error updating character:", error.message);
    }
  };

  // Function to delete the character from the Supabase database
  const handleDeleteCharacter = async () => {
    try {
      // Make a query to delete the character from the 'Teammates' table
      const { error } = await supabase
        .from("Teammates")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Navigate the user back to the gallery after deletion
      window.location.href = "/gallery";
    } catch (error) {
      console.error("Error deleting character:", error.message);
    }
  };

  return (
    <div className="page">
      <h1>Update</h1>
      {character && (
        <div className="update-container">
          <div className="character-details">
            <div className="character-left">
              <h2>{character.name}</h2>
              <div className="create_img_container">
                <img
                  src={characterImage}
                  alt={character.class}
                  className="create_img"
                />
              </div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedCharacter.name}
                onChange={handleEditChange}
              />
              <label htmlFor="level">Level:</label>
              <input
                type="number"
                id="level"
                name="lv"
                value={editedCharacter.lv}
                onChange={handleEditChange}
              />
              <label htmlFor="class">Character Class:</label>
              <select
                id="class"
                name="class"
                value={editedCharacter.class}
                onChange={handleEditChange}
              >
                <option value="warrior">Warrior</option>
                <option value="lancer">Lancer</option>
                <option value="machinist">Machinist</option>
                <option value="monk">Monk</option>
                <option value="ninja">Ninja</option>
                <option value="reaper">Reaper</option>
                <option value="red_mage">Red Mage</option>
                <option value="black_mage">Black Mage</option>
                <option value="white_mage">White Mage</option>
              </select>
            </div>
            <div className="character-right">
              <div className="stats">
                <h3>Stats</h3>
                <div className="create_stats_container">
                  <table>
                  <thead>
                    <tr>
                      <th>Stat</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                    <tbody>
                      {Object.entries(classStats[character.class]).map(([stat, multiplier]) => (
                        <tr key={stat}>
                          <td>{stat.toUpperCase()}</td>
                          <td>{parseInt((multiplier * editedCharacter.lv).toFixed(2))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="up_button" onClick={handleUpdateCharacter}>Save Changes</button>
              <button className="up_button" onClick={handleDeleteCharacter}>Delete Character</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Update;
