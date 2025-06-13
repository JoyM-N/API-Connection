import React, { use, useEffect, useState } from 'react';
import axios from 'axios';

const LibraryList = () => {
    const [libraries, setLibraries] = useState([]); // this is where data is "set"
    const BASE_URL_2 = import.meta.env.VITE_BASE_URL_2;

    useEffect(() => {
        axios.get('${BASE_URL_2}/libraries') // Using the BASE_URL from .env
        .then(response => {
            setLibraries(response.data); // SETTING data here!
        })
        .catch (error => {
            console.error('Error fetching libraries:',error);
        })
    }, [])
    return(
        <div>
            <h2>Library List</h2>
            <ul>
                {libraries.map(library => (
                    <li key={library.id}>
                        <strong>{library.name}</strong>: {library.description}
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default LibraryList;