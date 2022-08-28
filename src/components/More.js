import React from 'react'
// import { singleData } from './singleData';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const More = (props) => {
    const { singleData } = props
    return (
        <div className='more'>
            <Collapse >
                <Panel header="More" key="1">
                    <table className='moreTable'>
                        <tbody>
                            <tr>
                                <td align='left' className='bold'>Wind Speed :</td>
                                <td align='left'>{singleData && singleData?.wind.speed} km/hr</td>

                            </tr>
                            <tr>
                                <td align='left' className='bold'>Humidity :</td>
                                <td align='left'>{singleData && singleData?.main.humidity} %</td>

                            </tr>
                            <tr>
                                <td align='left' className='bold'>Pressure :</td>
                                <td align='left'>{singleData && singleData?.main.pressure} mBar</td>

                            </tr>
                            <tr>
                                <td align='left' className='bold'>Sun Rise :</td>
                                <td align='left'>{singleData && new Date(parseInt(singleData?.sys.sunrise) * 1000).toLocaleTimeString()}</td>

                            </tr>
                            <tr>
                                <td align='left' className='bold'>Sun Set :</td>
                                <td align='left'>{singleData && new Date(parseInt(singleData?.sys.sunset) * 1000).toLocaleTimeString()}</td>

                            </tr>
                        </tbody>
                    </table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default More