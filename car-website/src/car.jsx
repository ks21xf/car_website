import { useLoaderData } from 'react-router-dom'
import mileage from './assets/mileage.svg';
import gas_station from './assets/gas_station.svg';
import person from './assets/person.svg';
import transmission from './assets/transmission.svg';
import { useState } from 'react';

export default function Car(){
    const car_data = useLoaderData()

    const [imgCounter,setImgCounter] = useState(1)

    console.log(car_data)
    console.log(car_data.imgs)
    return(
        <>
        <div style = {{display: "inline-flex"}}>
            <div>
            <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                <div style ={{ width: "600px", height: "450px" }} id ="img-container">
                    <img style ={{width: "100%", height: "100%" }} src = {car_data.imgs+imgCounter+".jpg"}  onClick = {()=>{
                        setImgCounter(imgCounter+1)
                    }}></img>
                </div>
            </div>
            <div>
                <div style = {{display: "flex",justifyContent: "space-around"}}>
                    <div style = {{display:"inline-flex", justifyItems: "center", flexDirection: "column"}}>
                            <img style = {{width: "75px", height: "75px"}}src={mileage}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.mileage}km</span></center>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center", flexDirection: "column"}}>
                            <img style ={{width: "75px", height: "75px"}} src={transmission}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.transmission}</span></center>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center", flexDirection: "column"}}>
                            <img style ={{width: "75px", height: "75px"}} src={person}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.seats} seats</span></center>
                    </div>

                    <div style = {{display:"inline-flex", justifyItems: "center", flexDirection: "column"}}>
                            <img style ={{width: "75px", height: "75px"}} src={gas_station}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.fuel_type}</span></center>
                    </div>
                </div>
            </div>
            </div>
            <div  style ={{display: "inline-flex", flexDirection: "column"}}>
                <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h1>{car_data.year} {car_data.make} {car_data.model}</h1>
                    <h2>${car_data.price}</h2>
                    <button>Contact Us</button>
                    <br></br>
                </div>
                <br></br>
                <div style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    This Vehicle is Certified.<br></br>
                    Carfax Report:
                </div>
                <br></br>
                <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h2>More Features</h2>

                </div>
            </div>
        </div>
        </>
    )
}
