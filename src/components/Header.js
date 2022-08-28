import React, { useEffect, useState } from 'react'
import More from './More'
import { Input, Alert } from 'antd'
import '../css/header.css'
import Chart from './Chart'

const { Search } = Input
const Header = () => {
    // console.log(singleData)

    const [singleData, setSingleData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [city, setCity] = useState('New York');
    // const [searchTxt, setSearchTxt] = useState('')

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=New York&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
                console.log("data", data);
                if (data.cod === 200) {
                    setSingleData(data)
                } else {
                    setIsError(true)
                }
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    const getSingleData = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
                console.log("data", data);
                if (data.cod === 200) {
                    setSingleData(data)
                } else {
                    setIsError(true)
                }

            }).catch((err) => {
                console.log(err)
            })
    }

    const getWeather = (xcity) => {
        getSingleData(xcity);
        setCity(xcity);
        // setSearchTxt('');
    }

    console.log("singleData", singleData)
    return (
        <>
            <div className='headerContainer'>
                {
                    isError &&
                    <Alert message="City Not Found" className='alert' type="warning" showIcon closable onClose={() => setIsError(false)} />
                }
                <Search
                    placeholder="Input city name"
                    enterButton="Get Weather"
                    size="large"
                    //   value={searchTxt}
                    //   onChange={(e)=>setSearchTxt(e.target.value)}
                    onSearch={getWeather}
                    className='input'
                />
                <h1>{singleData && singleData?.name}</h1>
                <h1 style={{ fontSize: "36px" }}>{singleData && singleData?.main.temp} °C <img src={`https://openweathermap.org/img/wn/${singleData?.weather[0].icon}@2x.png`} alt="icon" /></h1>
                <h2>{singleData && singleData?.weather[0].main} <span>( {singleData && singleData?.weather[0].description} )</span></h2>
                <table className='HLtable'>
                    <tbody>
                        <tr>
                            <td align='center'>Highest :</td>
                            <td align='center'>{singleData && singleData?.main.temp_max} °C</td>
                        </tr>
                        <tr>
                            <td align='center'>Lowest :</td>
                            <td align='center'>{singleData && singleData?.main.temp_min} °C</td>
                        </tr>
                    </tbody>
                </table>
                <More
                    singleData={singleData}

                />

            </div>

            <Chart
                city={city}
            />
        </>
    )
}

export default Header