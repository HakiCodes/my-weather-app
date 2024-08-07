import "./current-weather.css"

const CurrentWeather = () => {
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">Belgrade</p>
                    <p className="weather-description">Sunny</p>
                </div>
                <img alt="weather" className="weather-icon" src="weather-icons/01d.png"></img>
            </div>
            <div className="bottom">
            <p className="temperature">64°F</p>
            </div>
        </div>
    );
}

export default CurrentWeather;