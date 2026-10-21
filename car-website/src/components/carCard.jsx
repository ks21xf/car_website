import { useState } from "react";
import mileage from '../assets/mileage.svg';
import gas_station from '../assets/gas_station.svg';
import person from '../assets/person.svg';
import transmission from '../assets/transmission.svg';
import { useNavigate } from "react-router-dom";


export default function CarCard(props){
    const navigate = useNavigate()

    function navigateToCarPage(cid){
        navigate("/cars/"+cid);
    }
    return(
        <>
            <div  id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center",width:"400px", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }} onClick = {()=>{
                        navigateToCarPage(props.car.cid)
                    }}>
                <div style ={{ width: "400px", height: "300px" }} id ="img-container">
                    <img style ={{width: "100%", height: "100%" }} src = {props.car.imgs+"1.jpg"}></img>
                </div>
                <div>
                    <div style = {{display: "flex", alignItems: "center" ,justifyContent: "space-between", padding: "0px"}}>
                        <h2 style = {{padding: "0", margin: "0", fontSize: "40px"}}>{props.car.make} {props.car.model}</h2>
                        <h2 style = {{padding: "0", margin: "0",fontSize: "40px"}}>${props.car.price}</h2>
                    </div>
                    <h2 style = {{padding: "0px 5px", margin: "0", fontSize: "35px"}}>{props.car.year}</h2>
                    <hr></hr>

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