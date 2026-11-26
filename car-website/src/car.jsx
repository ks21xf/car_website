import { useLoaderData, useNavigate } from 'react-router-dom'
import mileage from './assets/mileage.svg';
import gas_station from './assets/gas_station.svg';
import person from './assets/person.svg';
import transmission from './assets/transmission.svg';
import { useEffect, useState } from 'react';
import "./styles/car.css";
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

export default function Car(){
    const car_data = useLoaderData()
    const [imgCounter,setImgCounter] = useState(0)
    const [prevImgCounter,setPrevImgCounter] = useState(0)

    function mod(n,m){
        if(n<=-1){
            return m-1
        }else{
            return n%m
        }
    }
    useEffect(()=>{
        console.log(prevImgCounter,imgCounter)
        document.getElementById(prevImgCounter).classList.remove('selected')
        document.getElementById(imgCounter).classList.add('selected')
        setPrevImgCounter(imgCounter)

    },[imgCounter]);


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

    const [secondHalf, setSecondHalf] = useState("35vw")
    const [imageHeight,setImageHeight] = useState("450px")
    const [imageWidth,setImageWidth] = useState("600px")
    const [iconSize, setIconSize] = useState("75px")
    const [iconTitle, seticonTitle] = useState("24px")
    const [carTitle, setCarTitle] = useState("24px")

    useEffect(()=>{
        if(windowWidth>1000) {
            setSecondHalf("35vw")
            setImageHeight("450px")
            setImageWidth("600px")
            setIconSize("75px")
            seticonTitle("24px")
            setCarTitle("24px")
        }else if(windowWidth>600){
            setImageHeight("375px")
            setImageWidth("500px")
            setIconSize("65px")
            seticonTitle("20px")
            setCarTitle("20px")
        }else if (windowWidth <600 && windowWidth>400){
            setSecondHalf("60vw")
            setImageHeight("300px")
            setImageWidth("400px")
            setIconSize("80px")
            seticonTitle("18px")
            setCarTitle("18px")
        }else{
            setSecondHalf("80vw")
            setImageHeight("225px")
            setImageWidth("300px")
            setIconSize("40px")
            seticonTitle("16px")
            setCarTitle("18px")
        }

    },[windowWidth]);

    function populatePaginationDots(){
        var ele = []
        for(var v=0;v<car_data.num_images;v++){
            console.log(v)
            ele.push(<button style = {{cursor:"pointer"}} className='dots' id = {v} onClick={(e)=>{
                setImgCounter(Number(e.target.id))
                e.target.classList.add('selected')
            }}><span></span></button>)
        }
        return ele
    }

    function showContactForm(){
        const contactForm = document.getElementById("contact-form")
        if (contactForm) contactForm.style.display = "block"
    }

    async function submitContactForm(event){
        event.preventDefault();
        const [name,email,msg,phone] = [document.getElementById("user_name"),document.getElementById("user_email"),document.getElementById("user_msg"),document.getElementById("user_pn")]
        const formData = new FormData()

        formData.append('user_name',name.value)
        formData.append('user_email',email.value)
        formData.append("user_ph",phone.value)
        formData.append('user_msg',msg.value)
        formData.append("make",car_data.make)
        formData.append("model",car_data.model)
        formData.append("year",car_data.year)
        formData.append("id",car_data.id)
        formData.append("reason", "Interest in Vehicle")

        document.getElementById("result").textContent = "sending message..."

        try {
            // Send a POST request to Flask
            const response = await fetch( "http://localhost:5000/api/send-email",
                {   method: "POST",
                    body: formData,
                });

            const data = await response.json();
            document.getElementById("result").textContent = data.Message;
            if (!response.ok) throw new Error("Message did not send. Try again later.");
        } catch (error) {
            console.log(error)
            document.getElementById("result").textContent =error.message;
        }

    }

    return(
        <>
        <Header></Header>
        <div style = {{display: "flex",justifyContent: "space-around",flexWrap:"wrap"}}>
            <div>
                <div id = "card-container" style ={{display: "flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', position: "relative"}}>
                    <div style ={{ width: imageWidth, height: imageHeight }} id ="img-container">
                        <img style ={{width: "100%", height: "100%"}} src = {car_data.imgs+imgCounter+".jpg"}></img>
                    </div>
                    <button className = 'carousel-buttons prev'onClick = {()=>{setImgCounter(mod(imgCounter-1,car_data.num_images))}} >&larr;</button>
                    <button className='carousel-buttons next' onClick = {()=>{setImgCounter(mod(imgCounter+1,car_data.num_images));}}>&rarr;</button>
                </div>
                <div id = "pagination-dots-div" style = {{height: "10px", display: "flex", flexDirection: "row",justifyContent: "center", justifyItems: "center", gap:"2px"}}>
                    {car_data ? populatePaginationDots(): <p>loading...</p>}
                </div>
                <div>
                    <div style = {{display: "flex",justifyContent: "space-around"}}>
                        <div className = "imgs-below-photo-cont">
                                <img style = {{width: iconSize, height: iconSize}}src={mileage}/>
                                <center><span style ={{fontSize: iconTitle}}> {car_data.mileage}km</span></center>
                        </div>
                        <div className = "imgs-below-photo-cont">
                                <img style ={{width: iconSize, height: iconSize}} src={transmission}/>
                                <center><span style ={{fontSize: iconTitle}}> {car_data.transmission}</span></center>
                        </div>
                        <div className = "imgs-below-photo-cont">
                                <img style ={{width: iconSize, height: iconSize}} src={person}/>
                                <center><span style ={{fontSize: iconTitle}}> {car_data.seats} seats</span></center>
                        </div>

                        <div className = "imgs-below-photo-cont">
                                <img style ={{width: iconSize, height: iconSize}} src={gas_station}/>
                                <center><span style ={{fontSize: iconTitle}}> {car_data.fuel_type}</span></center>
                        </div>
                    </div>
                </div>
            </div>
            <div style ={{display: "flex", flexDirection: "column"}}>
                <div id = "card-container" style ={{display: "flex", width: secondHalf,flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h1 style ={{fontSize:carTitle}}>{car_data.year} {car_data.make} {car_data.model}</h1>
                    <h2>${car_data.price}</h2>
                    {car_data.sold ? <button style = {{width:"20vw"}}disabled>This Vehicle has Already Sold</button> : <button style = {{width:"20vw"}} id ="contact-form-button" onClick = {showContactForm}>Contact Us</button> }
                </div>
                <div id = "contact-form" style = {{display:"none", width: "inherit"}}>
                <br></br>
                <div style = {{ width: "inherit",display:"flex" ,flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <div style ={{display: "flex", flexDirection:"column"}}>
                        Contact Form
                        <form id = "form">
                            <label htmlFor="name">First and Last Name:</label><br></br>
                            <input type="user_name" id="user_name" name="user_name" required/>
                            <br></br>
                            <label htmlFor="email">Email:</label><br></br>
                            <input type="user_email" id="user_email" name="user_email" required/>
                            <br></br>
                            <label htmlFor="email">Phone Number:</label><br></br>
                            <input type="phone" id="user_pn" name="user_pn" required/>
                            <br></br>
                            <label htmlFor="message">Message:</label><br></br>
                            <textarea style ={{resize:"none"}} id="user_msg" name="user_msg" rows="5" required defaultValue = {"Hi! I'm interested in your "+car_data.year+ " "+ car_data.make+ " "+ car_data.model + ". Is it still available?"}></textarea><br></br>
                            <br></br>
                            <button onClick ={submitContactForm}>Send Message</button>
                            <p id = "result"></p>
                        </form>
                    </div>
                </div>
                </div>
                <br></br>

                <div style ={{ width: "inherit",display: "flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    This Vehicle is Certified.<br></br>
                    Carfax Report:
                </div>
                <br></br>
                <div id = "card-container" style ={{ width: "inherit",display: "flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h2>Unique Features</h2>
                    <ul>
                        {car_data.unique_features.split(",").map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <br></br>
                <div id = "card-container" style ={{ width: "inherit",display: "flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h2>Standard Features</h2>
                    <ul>
                        {car_data.standard_features.split(",").map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
