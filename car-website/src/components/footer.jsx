import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useState,useEffect } from "react";
import phone from "../assets/phone.svg";
import envelope from "../assets/envelope.svg";
import location from "../assets/location.svg";

export default function Footer(){
    const navigate = useNavigate()

    function navigateToHome(){
        navigate("/");
    }

    function navigateToCatalogue(){
        navigate("/catalogue");
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


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
        if(windowWidth>650) {

        }else if(550>= windowWidth && windowWidth <= 650){
        }else{
        }
    },[windowWidth]);

    return(
        <footer style = {{backgroundColor:"#3A3C41",width:"100%", margin:"0", padding:"0",border:"0"}}>
            <p style = {{ marginTop:"0", paddingTop:"5px",borderTop:"0",color:"whitesmoke"}}>Fully Licensed, Insured, and Registered Ontario Motor Vehicle Dealer.</p>
            <div style={{display:"flex", flexDirection:"column",color:"whitesmoke"}}>
                <div style ={{display:"flex", gap:"10px"}}>
                    <div style={{width:"30px", height:"30px"}}><img style = {{width:'100%'}} src = {phone}></img></div>
                    <p>289-969-1336</p>
                </div>
                <div style ={{display:"flex",gap:"10px" }}>
                    <div style={{width:"30px", height:"30px"}}><img style = {{width:'100%'}} src = {envelope}></img></div>
                    <p>"EMAIL ADDRESS"</p>
                </div>
                <div style ={{display:"flex", gap:"10px"}}>
                    <div style={{width:"30px", height:"30px"}}><img style = {{width:'100%', transform: "scale(0.75)"}} src = {location}></img></div>
                    <p><a src = "https://www.google.com/maps/search/1665+Beaverdams+Road,+Thorold,+ON.+L2V+4T3?entry=gmail&source=g"> 1665 Beaverdams Road, Thorold, ON. L2V 4T3</a></p>
                </div>
                <p>Available 24/7 for emergency lockout and mobile tire services across the Niagara Peninsula.</p>
            </div>
        </footer>
    );

}