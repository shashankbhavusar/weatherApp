import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/charts';

const Chart = (props) => {

    const [tempData, setTempData] = useState([])
    
    const formatter = (dataList)=>{
        let final = []
        for(let i=0; i< dataList.length; i++){
            final.push({
                // "days":dataList[i].dt_txt.split(' ')[0],
                "days":dataList[i].dt_txt,
                "temp":dataList[i].main.temp_max,
                "desc":dataList[i].weather[0].description,
                "category":"Highest Temp"
            },
            {
                // "days":dataList[i].dt_txt.split(' ')[0],
                "days":dataList[i].dt_txt,
                "temp":dataList[i].main.temp_min,
                "desc":dataList[i].weather[0].description,
                "category":"Lowest Temp"
            }
            )
        }
        console.log("final",final)
        setTempData(final)
    }

    const getForeCastData = async(xcity)=>{
        try{
            const data = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${xcity}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`);
            const json = await data.json();
            formatter(json.list);
        }catch(err){
            console.log("error in chart")
        }
       
        
    }

    useEffect(()=>{
        getForeCastData(props.city);
    },[props.city])
    
    
    

    const config = {
        data:tempData,
        xField: 'days',
        yField: 'temp',
        seriesField: 'category',
        
    };
    return (
        <div className='chartContainer'>
        <h1>Forecast for future days...</h1>
            <Line {...config} 
            className='chart'
            />
        </div>
    )
}

export default Chart