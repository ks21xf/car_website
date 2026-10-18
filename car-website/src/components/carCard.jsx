import { useState } from "react";
import mileage from '../assets/mileage.svg';
import gas_station from '../assets/gas_station.svg';
import person from '../assets/person.svg';
import transmission from '../assets/transmission.svg';

export default function CarCard(props){
    var numImages = props.numImages
    const [imgCounter,setImgCounter] = useState(1)
    return(
        <>
            <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", border: "2px solid #333",width:"550px"}}>

                <div style ={{ width: "550px", height: "350px" }} id ="img-container">
                    <img style ={{padding: "5px", width: "100%", height: "100%" }} src = {props.car.imgs+imgCounter+".jpg"} onClick = {()=>{
                        setImgCounter(imgCounter+1)
                    }}></img>
                </div>
                <div>
                    <div style = {{display: "flex", alignItems: "center" ,justifyContent: "space-between", padding: "0px 5px"}}>
                        <h2 style = {{padding: "0", margin: "0", fontSize: "40px"}}>{props.car.make} {props.car.model}</h2>
                        <h2 style = {{padding: "0", margin: "0",fontSize: "40px"}}>${props.car.price}</h2>
                    </div>
                    <h2 style = {{padding: "0px 5px", margin: "0", fontSize: "35px"}}>{props.car.year}</h2>
                </div>
                <div style = {{display: "flex",justifyContent: "space-between"}}>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img src={mileage}/>
                        <span style ={{fontSize: "24px"}}> {props.car.mileage}km</span>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img src={transmission}/>
                        <span style ={{fontSize: "24px"}}> {props.car.transmission}</span>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img src={person}/>
                        <span style ={{fontSize: "24px"}}> {props.car.seats}</span>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img src={gas_station}/>
                        <span style ={{fontSize: "24px"}}> {props.car.fuel_type}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
