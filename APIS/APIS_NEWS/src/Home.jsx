import React, { useEffect, useState } from 'react';
import './style.css';

function Home() {
    const [data, setData] = useState(
        {
            celcius: 10,
            name: 'London',
            humidity: 10,
            speed: 2,
            image: '/Images/clouds.png'
        }
    )

    const [name, setName] = useState('');
    const [error, setError] = useState('');


    const handleClick = () => {
        if (name !== "") {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=92860f1d00b15696ea6742e6c97a25cc&units=metric`;
        fetch (apiUrl)
         .then((response) => {
            if (!response.ok) {
                throw new Error('No se conectó correctamente');
            }
            return response.json();
         })
         .then((data) => {
            let imagePath = '';
                    if (data.weather[0].main === "Clouds") {
                        imagePath = "/Images/clouds.png";
                    } else if (data.weather[0].main === "Clear") {
                        imagePath = "/Images/clear.png";
                    } else if (data.weather[0].main === "Rain") {
                        imagePath = "/Images/rain.png";
                    } else if (data.weather[0].main === "Drizzle") {
                        imagePath = "/Images/drizzle.png";
                    } else if (data.weather[0].main === "Mist") {
                        imagePath = "/Images/mist.png";
                    } else {
                        imagePath = '/Images/clouds.png';
                    }
            console.log(data);
            setData ({
                celcius: data.main.temp, 
                name: data.name,
                humidity: data.main.humidity,
                speed: data.wind.speed,
                image: imagePath

                /*RECUERDA: quita el res para que fetch los identifique*/
            })
         })
         .catch(error => {
            setError(error.message);
            console.error('Error de carga:', error);
         })
        }
         /*{}*/
    }

    
    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><img src="/Images/search.png" alt="Search" /></button>
                </div>
                <div className='winfo'>
                <img className='winfo_img' src="/Images/clouds.png" alt=''/>
                <h1>{Math.round(data.celcius)}ºC</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src="/Images/humidity.png" alt=''/>
                        <div>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src="/Images/wind.png" alt=''/>
                        <div>
                            <p>{Math.round(data.speed)}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Home;