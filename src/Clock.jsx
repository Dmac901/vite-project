import './Clock.css';
import {useState} from 'react'

function Clock (props) {

const getTime = () => new Date().toLocaleTimeString(props.locale);
const getDate = () => new Date().toLocaleDateString(props.locale);

const [currentTime, setCurrentTime] = useState (getTime());
const [currentDate, setCurrentDate] = useState (getDate());

setInterval(()=>{
    setCurrentTime(getTime());
    setCurrentDate(getDate());
}, 1000);

    return (
        <div className="clock">
            <h1>{currentTime}</h1>
            <p>{currentDate}</p>
        </div>
    )
}

Clock.defaultProps = {
    locale: "en-US"
};
export default Clock;