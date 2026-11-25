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
    const [footerText,setFooterText] = useState("15px")
    const [footerTitles,setFooterTitles] = useState("25px")


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

        }else if(400>= windowWidth && windowWidth <= 800){
            setFooterTitles("20px")
            setFooterText("10px")
        }else{
            setFooterTitles("15px")
            setFooterText("8px")
        }
    },[windowWidth]);

    return(
        <footer style = {{backgroundColor:"#3A3C41", color:"#EEEEEE",width:"100%", minHeight:"auto",margin:"0", padding:"0",border:"0"}}>
            <div style ={{display:"flex", justifyContent: "space-evenly"}}>
                <div style ={{display: "flex", flexDirection:"column", justifyContent:""}}>
                    <h1 style= {{fontSize:footerTitles}}>OMVIC Certified</h1>
                    <p style ={{fontSize: footerText}}>Fully Licensed, Insured, and Registered Ontario Motor Vehicle Dealer.</p>
                </div>
                <div style ={{display: "flex", flexDirection:"column"}}>
                    <h1 style= {{fontSize:footerTitles}}>Contact Information</h1>
                    <div>
                        <p style ={{fontSize: footerText}}>289-969-1336 | info@406autoparts.ca | <a src = "https://www.google.com/maps/search/1665+Beaverdams+Road,+Thorold,+ON.+L2V+4T3?entry=gmail&source=g"> 1665 Beaverdams Road, Thorold, ON. L2V 4T3</a></p>
                    </div>
                </div>
            </div>
        <div style ={{height: "8vh",color:"#3A3C41"}}>
            ticker
        </div>
        </footer>
    );

}