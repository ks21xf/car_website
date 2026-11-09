import { useEffect, useState } from "react";
import mileage from '../assets/mileage.svg';
import gas_station from '../assets/gas_station.svg';
import person from '../assets/person.svg';
import transmission from '../assets/transmission.svg';
import { useNavigate } from "react-router-dom";
import sold from '../assets/sold.png'


export default function CarCard(props){
    const navigate = useNavigate()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mobileView, setMobileVew] = useState("30")
    const [mobileViewIcons, setMobileViewIcons] = useState("1.5")

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty array ensures this runs only on mount and unmount

    useEffect(()=>{
        if(windowWidth>800) {
            setMobileVew("27.5")
            setMobileViewIcons("1.45")

        }else if(550>= windowWidth && windowWidth <= 800){
            setMobileVew("100")
            setMobileViewIcons("4")
        }else{
            setMobileVew("35")
            setMobileViewIcons("1.75")
        }
    },[windowWidth]);
    function navigateToCarPage(cid){
        navigate("/cars/"+cid);
    }

    return(
       <>
            <div  id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", width:`${mobileView}%`, margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', cursor:"pointer" }} onClick = {()=>{
                        navigateToCarPage(props.car.cid)
                    }}>
                <div style ={{ aspectRatio:"4/3",width:"100%",height:"100%", position: "relative"}} id ="img-container">
                    <img style ={{width: "100%", height: "100%" }} src = {props.car.imgs+"0.jpg"}></img>
                    {props.car.sold ? <img id = "sold" style ={{width: "50%", height: "50%", transform: "translate(50%, -150%)" }}src = {sold}></img> : <></>}

                </div>
                <div>
                    <div style = {{display: "flex", alignItems: "center" ,justifyContent: "space-between", padding: "0px"}}>
                        <h2 style = {{fontSize:"clamp(2vw, 2vw + 0.5rem, 4vw)", padding: "0", margin: "0"}}>{props.car.make} {props.car.model}</h2>
                        <h2 style = {{fontSize:"clamp(2vw, 2vw + 0.5rem, 4vw)", padding: "0", margin: "0"}}>${props.car.price}</h2>
                    </div>
                    <h2 style = {{fontSize:"clamp(2vw, 2vw + 0.5rem, 4vw)",padding: "0px 5px", margin: "0"}}>{props.car.year}</h2>
                    <hr></hr>

                </div>
                <div style = {{display: "flex",justifyContent: "space-between"}}>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img  style ={{width:`${mobileViewIcons}vw`,height:`${mobileViewIcons}vw`}} src={mileage}/>
                        <span style ={{fontSize:`${mobileViewIcons}vw`}}> {props.car.mileage}km</span>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img style ={{width:`${mobileViewIcons}vw`,height:`${mobileViewIcons}vw`}} src={transmission}/>
                        <span style ={{fontSize:`${mobileViewIcons}vw`}}> {props.car.transmission}</span>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img style ={{width:`${mobileViewIcons}vw`,height:`${mobileViewIcons}vw`}} src={person}/>
                        <span style ={{fontSize:`${mobileViewIcons}vw`}}> {props.car.seats}</span>
                    </div>
                    <div style = {{display:"inline-flex", justifyItems: "center"}}>
                        <img style ={{width:`${mobileViewIcons}vw`,height:`${mobileViewIcons}vw`}} src={gas_station}/>
                        <span style ={{fontSize:`${mobileViewIcons}vw`}}> {props.car.fuel_type}</span>
                    </div>
                </div>
            </div>
        </>
    )
}