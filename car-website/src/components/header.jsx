import { useNavigate } from "react-router-dom";
import logo from '../assets/logo_small.png'
import "../styles/header.css";
import { useState,useEffect } from "react";

export default function Head(){
    const navigate = useNavigate()

    function navigateToHome(){
        navigate("/");
    }

    function navigateToCatalogue(){
        navigate("/catalogue");
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [iconSize, seticonSize] = useState("10.5")
    const [iconHeight, seticonHeight] = useState("6")
    const [headerText, setheaderText] = useState("2")

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
            seticonSize("10.5")
            seticonHeight("6")
            setheaderText("2")

        }else if(550>= windowWidth && windowWidth <= 650){
            seticonSize("12.25")
            seticonHeight("7")
            setheaderText("3")
        }else{
            seticonSize("14")
            seticonHeight("8")
            setheaderText("4")
        }
    },[windowWidth]);

    return(
        <>
          <header style = {{width:"100%",background:"whitesmoke", display: "flex", alignItems: "center", gap:"20px", margin:"0", padding:"0",border:"0"}}>
            <div className = "logo_container" style = {{aspectRatio: "7/4",width:`${iconSize}vw`,height:`${iconHeight}vw`}}>
                <img className = "links" src = {logo} onClick = {navigateToHome} style = {{width: "100%",height:"100%"}}></img>
            </div>
            <div className = "header-text"  style = {{display: "flex", alignItems: "center", justifyContent:"space-around", gap:"20px"}}>
                <h1 style = {{fontSize:`${headerText}vw`}} className = "links" onClick = {navigateToHome}>Home</h1>
                <h1 style = {{fontSize:`${headerText}vw`}} className = "links" onClick = {navigateToCatalogue}>Catalogue</h1>
            </div>
          </header>
        </>
    )

}