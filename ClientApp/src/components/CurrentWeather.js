import React, { Component } from 'react';

export class CurrentWeather extends Component {

    static kelvinToFahrenheit(kelvin) {
        return ((kelvin - 273.15) * 1.8) + 32;
    }

    static renderCurrentWeatherData(weatherData) {
        // Fail fast with an error message if there is no weather data.
        if (!weatherData) {
            return (
                <p>Unable to load current weather data.</p>
            );
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Weather</th>
                        <th>Current Temp</th>
                        <th>Low Temp</th>
                        <th>High Temp</th>
                        <th>Humidity</th>
                        <th>Wind Speed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{weatherData.name}</td>
                        <td>{weatherData.weather[0].main}</td>
                        <td>{Math.round(this.kelvinToFahrenheit(weatherData.main.temp))}F</td>
                        <td>{Math.round(this.kelvinToFahrenheit(weatherData.main.temp_min))}F</td>
                        <td>{Math.round(this.kelvinToFahrenheit(weatherData.main.temp_max))}F</td>
                        <td>{weatherData.main.humidity}%</td>
                        <td>{weatherData.wind.speed}mph</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    displayName = CurrentWeather.name;

    constructor(props) {
        super(props);
        this.state = {
            weatherData: {},
            loading: true,
        };

        // TODO: API details can be changed here.
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Seattle,us&APPID=583bebf25e5677d021852f2d1e39f8fe')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(`Request rejected with status ${response.status}`);
                }
            })
            .then(data => {
                this.setState({ weatherData: data, loading: false });
            })
            .catch(err => {
                console.error(err);
                this.setState({ weatherData: null, loading: false });
            });
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CurrentWeather.renderCurrentWeatherData(this.state.weatherData);

        return (
            <div>
                <h1>Current Weather</h1>
                {contents}
            </div>
        );
    }
}
