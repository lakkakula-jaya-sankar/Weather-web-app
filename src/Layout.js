import axios from "axios";
import { use, useEffect, useState } from "react";
import "./Layout.css";
import Card from "./Card";

export default function Layout(){

    const[getCity, setCity] = useState('');
    const[getData, setData] = useState({});
    const[getIcon, setIcon] = useState('/assets/sun.png');

    function loc_into_coord(){

        console.log(getCity);

        axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${getCity}`)
        .then(response => {
                    const results = response.data.results;
                    if (!results || results.length === 0) {
                        alert("City not found");
                        return;
                    }
                    const {latitude, longitude} = results[0];
                    getting_details(latitude, longitude);
        })
        .catch(err => console.log(err))
    }

    function getting_details(lat, lon) {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
        .then(res => {
            const data = res.data;
            let weather = data.current_weather;
            let dateTime = new Date(weather.time);
            let isDay = weather.is_day === 1 ? "Day" : "Night";
            setIcon(getWeatherIcon(weather.weathercode));

            const forecast = data.daily.time.slice(0, 4).map((day, index) => ({
                day: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
                max: data.daily.temperature_2m_max[index],
                min: data.daily.temperature_2m_min[index]
            }));

            setData({
                city: getCity,
                temperature: weather.temperature,
                time: dateTime.toLocaleTimeString(),
                date: dateTime.toDateString(),
                windspeed: weather.windspeed,
                winddirection: weather.winddirection,
                isDay: isDay,
                elevation: data.elevation,
                forecast: forecast
            });
        })
        .catch(err => console.error(err));
    }

    function getWeatherIcon(code) {
        if (code === 0) return "/assets/sun.png";
        else if (code === 1 || code === 2 || code === 3) return "/assets/Partly Cloudy.png";
        else if (code >= 45 && code <= 48) return "/assets/fog.png";
        else if (code >= 51 && code <= 67) return "/assets/clouds.png";
        else if (code >= 71 && code <= 77) return "/assets/cloud.png";
        else if (code >= 80 && code <= 82) return "/assets/rain.png";
        else if (code >= 95 && code <= 99) return "/assets/flood.png";
        else return "/assets/cloud.png";
    }


    return (
        <div>
            <nav>
                <div className="navi-bar">
                <div className="navi-bar-input"><input type="text" id="city" placeholder="Enter Your City" autoComplete="off" onChange={(e) =>{
                    setCity(e.target.value);
                }}/></div>
                <div className="navi-bar-search"><i className="bi bi-search" onClick={loc_into_coord}></i></div>
                </div>
            </nav>

            <section>
                <div className="body-info">
                    <div className="body-left">
                        <img src={getIcon} alt="weather" className="images-width" id="weather-icon"/> &nbsp; &nbsp;
                        <h2 className="display-inline main-temp" id="temp">{getData.temperature} &deg; C</h2>
                        <div>
                            <img src="/assets/location.png" alt="location" className="images-width-sub color-png"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="cityname">{getCity}</h3>
                        </div>
                        <div>
                            <img src="/assets/time.png" alt="time" className="images-width-sub"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="time">{getData.date}</h3>
                        </div>
                        <div>
                            <img src="/assets/calendar.png" alt="date" className="images-width-sub"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="date">{getData.time}</h3>
                        </div>
                    </div>
                    <div className="body-right">
                        <div>
                            <img src="/assets/altitude.png" alt="altitude" className="images-width-sub"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="altitude">{getData.elevation} (Altitude)</h3>
                        </div>
                        <div>
                            <img src="/assets/wind.png" alt="wind" className="images-width-sub"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="wind">{getData.windspeed} km/hr</h3>
                        </div>
                        <div>
                            <img src="/assets/direction.png" alt="direction" className="images-width-sub color-png"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="direction">{getData.winddirection} (Wind Direction)</h3>
                        </div>
                        <div>
                            <img src="/assets/bka.png" alt="daynight" className="images-width-sub"/> &nbsp; &nbsp;
                            <h3 className="display-inline" id="daynight">{getData.isDay}</h3>
                        </div>
                    </div>
                </div>
            </section>

        <section>
            {
                <div className="cards-section" id="forecast-cards">
                    {getData.forecast && getData.forecast.map((dta, index) => (
                        <Card
                        key={index}
                        city={getData.city}
                        weather={dta.day}
                        temp={dta.max}
                        min={dta.min}
                        max={dta.max}
                        icon="/assets/sun.png"
                        />
                    ))}
                </div>
            }
        </section>
    </div>
    )
}