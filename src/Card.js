import React from 'react';
import styled from 'styled-components';


const Card = ({ city, weather, temp, min, max, icon }) => {
    return (
    <StyledWrapper>
        <div className="cardContainer">
            <div className="card">
            <p className="city">{city}</p>
            <p className="weather">{weather}</p>
            <img src={icon} alt="weather-icon" width={50} height={50} />
            <p className="temp">{temp}°</p>
            <div className="minmaxContainer">
                <div className="min">
                <p className="minHeading">Min</p>
                <p className="minTemp">{min}°</p>
                </div>
                <div className="max">
                <p className="maxHeading">Max</p>
                <p className="maxTemp">{max}°</p>
                </div>
            </div>
            </div>
        </div>
    </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
.cardContainer {
    width: fit-content;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    position: relative;
    width: 200px;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    border-radius: 10px;
    backdrop-filter: blur(30px);
    background-color: rgba(65, 65, 65, 0.308);
    border: 1px solid rgba(255, 255, 255, 0.089);
    cursor: pointer;
}

.city {
    font-weight: 700;
    font-size: 0.9em;
    letter-spacing: 1.2px;
    color: white;
}

.weather {
    font-weight: 500;
    font-size: 0.7em;
    letter-spacing: 1.2px;
    color: rgb(197, 197, 197);
}

.temp {
    font-size: 1.8em;
    color: white;
}

.minmaxContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.min,.max {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0px 20px;
    gap: 4px;
}

.max {
    align-items: flex-start;
    border-left: 2px solid white;
}

.maxHeading, .minHeading {
    font-size: 0.7em;
    font-weight: 600;
    color: white;
}

.maxTemp, .minTemp {
    font-size: 0.6em;
    font-weight: 500;
    color: rgb(197, 197, 197);
}

.cardContainer::before {
    width: 100px;
    height: 100px;
    content: "";
    position: absolute;
    background-color: rgb(144, 161, 255);
    z-index: -1;
    border-radius: 50%;
    left: 100px;
    top: 50px;
    transition: all 1s;
}

.cardContainer:hover::before {
    transform: translate(-50px, 50px);
}`;

export default Card;
