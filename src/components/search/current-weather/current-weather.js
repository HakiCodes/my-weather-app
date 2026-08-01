import "./current-weather.css"

const formatDate = (unixSeconds, timezoneOffsetSeconds) => {
    const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        timeZone: "UTC",
    });
}

const CurrentWeather = ({ data }) => {
    const icon = data.weather?.[0]?.icon;

    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="date">{formatDate(data.dt, data.timezone)}</p>
                    <p className="weather-description">{data.weather?.[0]?.description}</p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={icon ? `/weather-icons/${icon}.png` : "/weather-icons/unknown.png"}
                />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main.temp)}°F</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels Like</span>
                        <span className="parameter-value">{Math.round(data.main.feels_like)}°F</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{Math.round(data.wind.speed)} mph</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
