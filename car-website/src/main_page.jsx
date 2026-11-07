import { useLoaderData } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/header.jsx'
import bg_img from './assets/main-page-background.jpg';
import "./styles/main_page.css";

function MainPage(){
    const navigate = useNavigate()
    const cars_data = useLoaderData()

    function navigateToCatalogue(){
        navigate("/catalogue");
    }
    return (
        <>
            <Header></Header>
            <div style = {{width:"100vw",height:"90vh", position:"relative"}}>
                <div style = {{width:"40%",height:"100%", zIndex:"30", background:"rgba(3,3,3,0.8)",position:"absolute"}}>
                    <br></br>
                    <center><h1 style = {{color: "whitesmoke", fontSize:"60px"}}>406 Auto Parts</h1></center>
                    <br></br>
                    <center><button className ="links function-buttons" onClick={navigateToCatalogue}>View Catalogue</button></center>
                </div>
                <img src = {bg_img} style = {{width:"100%",height: "100%"}}></img>
            </div>

        </>
    )
}

export default MainPage