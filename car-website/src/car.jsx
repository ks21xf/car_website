import { useLoaderData, useNavigate } from 'react-router-dom'
import mileage from './assets/mileage.svg';
import gas_station from './assets/gas_station.svg';
import person from './assets/person.svg';
import transmission from './assets/transmission.svg';
import { useEffect, useState } from 'react';
import "./styles/car.css";

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
        <div style = {{display: "inline-flex"}}>
            <div>
            <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', position: "relative"}}>
                <div style ={{ width: "600px", height: "450px" }} id ="img-container">
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
                            <img style = {{width: "75px", height: "75px"}}src={mileage}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.mileage}km</span></center>
                    </div>
                    <div className = "imgs-below-photo-cont">
                            <img style ={{width: "75px", height: "75px"}} src={transmission}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.transmission}</span></center>
                    </div>
                    <div className = "imgs-below-photo-cont">
                            <img style ={{width: "75px", height: "75px"}} src={person}/>
                            <center><span style ={{fontSize: "24px"}}> {car_data.seats} seats</span></center>
                    </div>

                    <div className = "imgs-below-photo-cont">
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
                    {car_data.sold ? <button disabled>This Vehicle has Already Sold</button> : <button id ="contact-form-button" onClick = {showContactForm}>Contact Us</button> }
                </div>
                <div id = "contact-form" style = {{display:"none"}}>
                <br></br>
                <div style = {{flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <div style ={{display: "inline-flex", flexDirection:"column"}}>
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
                            <label htmlFor="inquiry">Message Type:</label><br></br>
                            <input onClick = {()=>{
                                document.getElementById("user_msg").value = "Hi! I'm interested in your "+car_data.year+ " "+ car_data.make+ " "+ car_data.model + ". Is it still available?"
                            }} type="radio" name ="inquiry" id="avail" defaultChecked/>
                            <label htmlFor="inquiry">Check Availability</label><br></br>
                            <input onClick = {()=>{
                                console.log( document.getElementById("user_msg"))
                                document.getElementById("user_msg").value = "Hi! I'm interested in booking a test drive with your "+car_data.year+ " "+ car_data.make+ " "+ car_data.model + ". When are you available?"
                            }} type="radio" name="inquiry" id="test"/>
                            <label htmlFor="inquiry">Book a Test Drive</label><br></br>

                            <label htmlFor="message">Message:</label><br></br>
                            <textarea id="user_msg" name="user_msg" rows="5" required defaultValue = {"Hi! I'm interested in your "+car_data.year+ " "+ car_data.make+ " "+ car_data.model + ". Is it still available?"}></textarea><br></br>
                            <br></br>
                            <button onClick ={submitContactForm}>Send Message</button>
                            <p id = "result"></p>
                        </form>
                    </div>
                </div>
                </div>
                <br></br>

                <div style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    This Vehicle is Certified.<br></br>
                    Carfax Report:
                </div>
                <br></br>
                <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h2>Unique Features</h2>
                    <ul>
                        {car_data.unique_features.split(",").map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <br></br>
                <div id = "card-container" style ={{display: "inline-flex", flexDirection: "column", justifyItems: "center", margin: "0px 15px", padding: "0px 15px",  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}>
                    <h2>Standard Features</h2>
                    <ul>
                        {car_data.standard_features.split(",").map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
