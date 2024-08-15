import { useState } from 'react';
import './NamePicker.css'
function NamePicker() {
    const adjectives = ["Strong", "Tired", "Hungry", "Moist"];
    const colors = ["Goldenrod", "Pink", "Mauve", "Red", "Lavender"];
    const nouns = ["Cat", "Flower", "Kerfuffle", "Pizza", "Tea", "Stone"];
    const generateName = () => {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${adj} ${color}-${noun}`;
    }
    const [currentName, setCurrentName] = useState(generateName());
    return (
        <div className="name-picker">
            <h1>{currentName}</h1>
            <button onClick={() => setCurrentName(generateName())}>Reroll Name</button>
        </div>
    );
}
export default NamePicker;