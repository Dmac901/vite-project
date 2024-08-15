import { useEffect, useState } from 'react';
//import './Names.css'

function Names() {
    const [names, setNames] = useState([]);

    // Fetch the list of names from the API
    function fetchNames() {
        fetch("http://127.0.0.1:3000/api")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setNames(json);
            })
            .catch((error) => console.error("Error fetching names:", error));
    }

    // Create a new name
    function createName(newName) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newName })
        };
        fetch("http://127.0.0.1:3000/api", options)
            .then((response) => response.json())
            .then((json) => {
                setNames((prevNames) => [...prevNames, json]);
            })
            .catch((error) => console.error("Error creating name:", error));
    }

    // Delete a name
    function deleteName(id) {
        const options = {
            method: "DELETE",
        };
        fetch(`http://127.0.0.1:3000/api/${id}`, options)
            .then(() => {
                fetchNames(); // Refresh the list
            })
            .catch((error) => console.error("Error deleting name:", error));
    }

    // Update a name
    function updateName(id, updatedName) {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: updatedName })
        };
        fetch(`http://127.0.0.1:3000/api/${id}`, options)
            .then(() => {
                fetchNames(); // Refresh the list
            })
            .catch((error) => console.error("Error updating name:", error));
    }

    useEffect(() => {
        fetchNames();
    }, []);

    // Handle form submission for adding a name
    function handleSubmit(event) {
        event.preventDefault();
        createName(event.target.name.value);
    }

    // Handle form submission for updating a name
    function handleUpdate(event, id) {
        event.preventDefault();
        const updatedName = event.target.name.value;
        updateName(id, updatedName);
    }

    // Handle the "delete name" button click
    function handleDelete(event) {
        event.preventDefault();
        deleteName(Number(event.target.id)); // Ensure ID is a number
    }

    // Render the list of names
    const items = names.map((obj) => (
        <li key={obj.id}>
            <span className="left">{obj.name}</span>
            <button id={obj.id} onClick={handleDelete} className="right">Delete</button>
            <form onSubmit={(e) => handleUpdate(e, obj.id)}>
                <input name="name" placeholder="Update a name" type="text" />
                <input type="submit" value="Update" />
            </form>
        </li>
    ));

    return (
        <>
            <h1>Names!</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <input name="name" placeholder="Add a name" type="text" />
                    <input type="submit" value="Add" />
                </p>
            </form>
            <ul>
                {items}
            </ul>
           
        </>
    );
}

export default Names;