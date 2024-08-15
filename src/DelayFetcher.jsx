import {useState, useEffect} from 'react'


// Hack borrow this code https://sentry.io/answers/what-is-the-javascript-version-of-sleep/
    

function DelayedResult() {
    const n = Math.floor(Math.random()) * 5 + 2;
    let url = "https://httpbin.org/delay/" + n ;

    const [content, setContent] = useState("Waiting...");
    //const [buttonText, setButtonText] = useState("Get UUID");
    //const url = 'https://httpbin.org/uuid';
   
    function fetchApi() {
        const request = new Request(url)
            fetch(request)
            .then((response) => response.json())
            .then((json) => {
                setContent(json.url);
               // setButtonText("Get new Delay.");
            });
    }
useEffect(fetchApi);

        return (
            <div>
                <pre>{content}</pre>
            </div>
        )

}

export default DelayedResult;
