import "./forecast.css"

const formatDay = (dt) => {
    return new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
}

const Forecast = ({ data }) => {
    const dailyForecasts = data.list.filter((entry) => entry.dt_txt.includes("12:00:00"));

    return (
        <div className="forecast">
            <p className="title">Daily Forecast</p>
            <div className="forecast-cards">
                {dailyForecasts.map((entry) => {
                    const icon = entry.weather?.[0]?.icon;
                    return (
                        <div className="forecast-card" key={entry.dt}>
                            <p className="forecast-day">{formatDay(entry.dt)}</p>
                            <img
                                alt="weather"
                                className="forecast-icon"
                                src={icon ? `/weather-icons/${icon}.png` : "/weather-icons/unknown.png"}
                            />
                            <p className="forecast-temp">{Math.round(entry.main.temp)}°F</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;
