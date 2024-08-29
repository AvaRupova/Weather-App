import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
<script src="https://kit.fontawesome.com/787990df3a.js" crossorigin="anonymous"></script>
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherWindy } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

const VITE_APP_ID = '4304fd896affc41cc49392c01811bc33'

const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    '01d': <TiWeatherSunny />,
    '02d': <TiWeatherPartlySunny />,
    '03d': <TiWeatherCloudy />,
    '04d': <TiWeatherCloudy />,
    '09d': <TiWeatherDownpour />,
    '10d': <TiWeatherPartlySunny />,
    '11d': <TiWeatherStormy />,
    '13d': <TiWeatherSnow />,
    '50d': <TiWeatherWindyCloudy />,
    '01n': <TiWeatherSunny />,
    '02n': <TiWeatherPartlySunny />,
    '03n': <TiWeatherCloudy />,
    '04n': <TiWeatherCloudy />,
    '09n': <TiWeatherDownpour />,
    '10n': <TiWeatherPartlySunny />,
    '11n': <TiWeatherStormy />,
    '13n': <TiWeatherSnow />,
    '50n': <TiWeatherWindyCloudy />,

  }

  const search = async (city) => {
    if (city === '') {
      alert('Enter City Name!')
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url)
      const data = await response.json()

      if(!response.ok){
        alert(data.message)
        return
      }
      console.log(data);

      const icon = allIcons[data.weather[0].icon || <TiWeatherSunny />]
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      })

    } catch (error) {
      setWeatherData(false)
      console.error('Error in fetching weather data')

    }
  }

  useEffect(() => {
    search("London")
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <i class="fa-solid fa-magnifying-glass" onClick={() => search(inputRef.current.value)}></i>
      </div>

      {weatherData ?  <>
      <div className='sunny'>{weatherData.icon}</div>
        <p className='temperature'>{weatherData.temperature}°</p>
        <p className='location'>{weatherData.location}</p>

        <div className="weather-data">
          <div className="col">
            <WiHumidity className='img-humidity' />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <TiWeatherWindy className='img-wind-speed' />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}




    </div>
  )
}

export default Weather
