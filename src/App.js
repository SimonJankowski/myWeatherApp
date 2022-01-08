import React, { useState } from 'react';
import sun from './assets/sun2.png'
import cloud from './assets/cloud1.png'
import sunncloud from './assets/sunncloud.png'

const api = {
  key: '8ff143e37387dc9b59ebd3640fead034',
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [clouds, setClouds] = useState(50);

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('')
          setWeather(result)
          setClouds(result.clouds.all)
          console.log(result)
        })
    }
  }
  const decideIcon = () => {
    if (clouds < 30) return sun
    else if (clouds < 60) return sunncloud
    else return cloud
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `
  }

  const timeBuilder = (d) => {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (minutes < 10) return `${hours}:0${minutes}`
    return `${hours}:${minutes} `
  }

  const localTime = new Date(Date.now() + ((weather.timezone - 3600) * 1000));
  let tiempo = '';

  (localTime.getHours() < 7 || localTime.getHours() > 19) ? tiempo = 'night' : tiempo = 'day';

  return (
    <div className={(`App ${tiempo}`)}>
      <main>
        <div className='search-box'>
          <input onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} type="text" className='search-bar' placeholder="search..." />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="time">{timeBuilder(localTime)}</div>
            </div>

            <div className="weather-box">
              <img src={decideIcon()} className="obrazek" />
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
            </div>
          </div>
        ) : ('')}
        
      </main>
      <footer className='footer'><span>&copy; Simon Jankowski</span></footer>
    </div>
  );
}

export default App;
