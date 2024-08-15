import {useState} from 'react';
import "./ApiFetcher.css"

function ApiFetcher() {
    const [result, setResult] = useState("");
    const [buttonText, setButtonText] = useState("Get UUID");
    const url = 'https://httpbin.org/uuid';
    
    function sendRequest(event) {
        const request = new Request(url)
        fetch(request)
        .then((response) => response.json())
        .then((json) => {
            setResult(json.uuid);
            setButtonText("Get another uuid");
        });
    }

    return (
        <div className='api-fetcher'>
            <h1>API Fetcher</h1>
            <button onClick={sendRequest}>{buttonText}</button>
            {result && <p>Here's a UUID: {result || 'nothing'}</p>}
        </div>
    )
}

export default ApiFetcher;