import { useNavigate } from "react-router-dom";
import logo from '../assets/logo_small.png'
import "../styles/header.css";


export default function Head(){
    const navigate = useNavigate()

    function navigateToHome(){
        navigate("/");
    }

    function navigateToCatalogue(){
        navigate("/catalogue");
    }

    return(
        <>
          <header style = {{background:"whitesmoke", display: "flex", alignItems: "center", gap:"20px", margin:"0", padding:"0",border:"0"}}>
            <div class = "logo_container" style = {{width: "210px",height:"120px"}}>
                <img className = "links" src = {logo} onClick = {navigateToHome} style = {{width: "100%",height:"100%"}}></img>
            </div>
            <div class = "header-text"  style = {{display: "flex", alignItems: "center", justifyContent:"space-around", gap:"20px"}}>
                <h1 className = "links" onClick = {navigateToHome}>Home</h1>
                <h1 className = "links" onClick = {navigateToCatalogue}>Catalogue</h1>
            </div>
          </header>
        </>
    )

}