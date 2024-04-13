import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create({ classImages, classStats, supabase }) {
  // State variables
  const [characterName, setCharacterName] = useState("");
  const [characterLevel, setCharacterLevel] = useState(1);
  const [characterClass, setCharacterClass] = useState("warrior");
  const navigate = useNavigate();

  // Dictionary to map character classes to image URLs

  const handleNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleLevelChange = (event) => {
    // Ensure the level is within the range of 1 to 100
    let level = parseInt(event.target.value);
    level = isNaN(level) ? 1 : Math.min(Math.max(level, 1), 100);
    setCharacterLevel(level);
  };

  const handleClassChange = (event) => {
    setCharacterClass(event.target.value);
  };

  const renderCharacterImage = () => {
    const imageUrl = classImages[characterClass];
    return <img className="create_img" src={imageUrl} alt={characterClass} />;
  };

  const handleCreateCharacter = async () => {
    try {
      // Insert character data into Supabase database
      const { data, error } = await supabase.from('Teammates').insert([
        {
          name: characterName,
          class: characterClass,
          lv: characterLevel,
        },
      ]);

      if (error) {
        throw error;
      }
      // Navigate to /gallery after character creation
      navigate("/gallery");
    } catch (error) {
      console.error('Error creating character:', error.message);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Create a Teammate</h1>
        <label htmlFor="name">Character Name:</label>
        <input
          type="text"
          id="name"
          value={characterName}
          onChange={handleNameChange}
        />
        <br />
        <label htmlFor="level">Character Level (1-100):</label>
        <input
          type="number"
          id="level"
          value={characterLevel}
          min={1}
          max={100}
          onChange={handleLevelChange}
        />
        <br />
        <label htmlFor="class">Character Class:</label>
        <select id="class" value={characterClass} onChange={handleClassChange}>
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
        <button onClick={handleCreateCharacter}>Create Character</button>
        <br />
        <div className="create_container">
          <div className="create_img_container">
            {renderCharacterImage()}
          </div>
          <div className="create_stats_container">
            <table>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(classStats[characterClass]).map(([stat, multiplier]) => (
                  <tr key={stat}>
                    <td>{stat.toUpperCase()}</td>
                    <td>{parseInt((multiplier * characterLevel).toFixed(2))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;