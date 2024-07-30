import "./current-weather.css"

const CurrentWeather = () => {
    return (
        <div className="weather">
            <div classname="top">
                <p className="city">Belgrade</p>
                <p className="weather-description">Sunny</p>
            </div>
            <img alt="weather" className="weather-icon" src="weather-icons/01d.png"></img>
        </div>
    );
}

export default CurrentWeather;