import { useLoaderData } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/header.jsx'
import Footer from './components/footer.jsx';
import bg_img from './assets/main-page-background.jpg';
import bg_img3 from './assets/main-page-bg-3.jpg';
import one from './assets/ket_cut.jpg';
import two from './assets/tire_repair.jpg';
import trust from './assets/trust2.svg';
import family from './assets/family.svg';
import quiet from './assets/quiet.svg';


import "./styles/main_page.css";

function MainPage(){
    const navigate = useNavigate()
    const cars_data = useLoaderData()

    function navigateToCatalogue(){
        navigate("/catalogue");
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
        formData.append("reason", "Main Page")

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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [seeThru, setSeeThru] = useState("40")
    const [seeThruHeight, setseeThruHeight] = useState("90")

    const [firstTitle, setFirstTitle] = useState("7")
    const [firstTitleText,setFirstTitleText] = useState("4")

    const [secondTextWidth, setSecondTextWidth] = useState("50%")
    const [secondTitleWidth,setSecondTitleWidth] = useState("80%")

    const [secondTitle, setSecondTitle] = useState("40")

    const [cardSize,setCardSize] = useState("400px")
    const [bottomImgSize,setBottomImgSize] = useState("400px")
    const [darkCardSize,setDarkCardSize] = useState("35vw")

    const [formFields,setFormFields] = useState("25vw")

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
        console.log(cardSize)
        if(windowWidth>1000) {
            setSeeThru("50")
            setseeThruHeight("120")
            setSecondTitle("60")
            setCardSize("500px")
            setBottomImgSize("400px")
            setDarkCardSize("45vw")
            document.getElementById("dark-section").style.flexDirection =""
            document.getElementById("form").style.flexDirection="row"
            setFormFields("25vw")


        }else if(windowWidth>600){
            setSeeThru("100")
            setseeThruHeight("120")
            setSecondTitle("40")
            setCardSize("400px")
            setBottomImgSize("400px")
            setDarkCardSize("80vw")
            document.getElementById("dark-section").style.flexDirection ="column"
            setSecondTextWidth("80%")
            setSecondTitleWidth("80%")
            document.getElementById("form").style.flexDirection="column"
            setFormFields("50vw")

        }else if (windowWidth>400){
            setSeeThru("100")
            setseeThruHeight("120")
            setSecondTitle("30")
            setCardSize("100%")
            setBottomImgSize("80%")
            setDarkCardSize("100%")
            document.getElementById("dark-section").style.flexDirection ="column"
            setSecondTextWidth("100%")
            setSecondTitleWidth("100%")
            document.getElementById("form").style.flexDirection="column"
            setFormFields("75vw")
        }else{
            setSeeThru("100")
            setseeThruHeight("120")
            setSecondTitle("30")
            setCardSize("100%")
            setBottomImgSize("80%")
            setDarkCardSize("100%")
            document.getElementById("dark-section").style.flexDirection ="column"
            setSecondTextWidth("100%")
            setSecondTitleWidth("100%")
            document.getElementById("form").style.flexDirection="column"
            setFormFields("75vw")

        }

    },[windowWidth]);
    return (
        <>
            <Header></Header>
            <div style = {{width:"100%",height:`${seeThruHeight}vh`, position:"relative"}}>
                <div style = {{width:`${seeThru}%`,height:"100%", zIndex:"30", background:"rgba(3,3,3,0.8)",position:"absolute", bottom: "0", left: "0"}}>
                    <br></br>
                    <center><h1 style = {{color: "whitesmoke", fontSize:firstTitle+"vh"}}>406 Auto Parts</h1></center>
                    <br></br>
                    <center><p style = {{fontSize:firstTitleText+"vh"}}className='para'>Niagara’s Complete Automotive Hub: Quality Used Vehicles & 24/7 Mobile Roadside Service</p></center>
                    <br></br>
                    <center><p style = {{fontSize:firstTitleText+"vh"}} className='para'>From buying your next reliable vehicle to getting you back on the road when you’re stranded, we’ve got you covered. Certified pre-owned cars, precision key replacement, and on-site tire repair—delivered straight to your driveway.</p></center>
                    <center><button className ="links function-buttons" onClick={navigateToCatalogue}>View Catalogue</button></center>
                    <br></br>
                    <center><a href= "#mobile-services"style = {{cursor:"pointer",textDecoration:"none", color:"black"}}><button className ="links function-buttons">Mobile Services</button></a></center>

                </div>
                <img src = {bg_img} style = {{objectFit: "cover", width:"100%",height: "100%"}}></img>
            </div>
            <br></br>
            <h1 id = "mobile-services" style={{marginLeft: "1%",fontSize:secondTitle+"px",width:secondTitleWidth, marginBottom:"0px" }}>OUR MOBILE SERVICES AT A GLANCE</h1>
            <p style = {{marginLeft: "1%", width:secondTextWidth}}>Our mobile workshop comes right to your home, workplace, or the side of the highway to handle precision tire repairs on the spot.</p>
            <a href= "#contact" style = {{cursor:"pointer",textDecoration:"none", color:"black"}}><button style = {{marginLeft:"1%"}} onClick={showContactForm} className ="function-buttons">Contact Us</button></a>
            <div style = {{marginLeft:"1%",display:"flex", justifyContent: "space-evenly", flexWrap:"wrap"}}>
                <div style ={{width: cardSize, backgroundColor:"#F5F6FA", margin:"10px"}}>
                    <div style ={{width:"100%",height:"400px", backgroundColor:"black", position:"relative",clipPath: "polygon(0% 0%, 100% 0, 100% 85%,0% 100%)"}}>
                        <img src = {one} style ={{width:"100%",height:"100%"}}></img>
                    </div>
                    <div style = {{padding:"5px"}}>
                        <h2>24/7 Mobile Automotive Locksmith</h2>
                        <ul>
                            <li><b>All Keys Lost & Smart Fob Replacement: </b>Lost your only key? We cut and program factory-grade smart proximity fobs, push-to-start remotes, and transponder keys right at your vehicle.</li>
                            <li><b>Damage-Free Emergency Vehicle Lockouts: </b>Rapid 24/7 unlocking for cars, SUVs, and pickup trucks without scratching paint or damaging door seals.</li>
                            <li><b>Spare Keys Cut & Programmed On-Site:</b> Avoid high dealership prices and long waits by getting an extra key fob or mechanical blade cut and programmed in minutes.</li>
                            <li><b>Ignition & Door Lock Repair:</b> Fast troubleshooting and repair for worn key blades, stuck ignitions, and unresponsive key fobs.</li>
                            <li><b>OMVIC-Registered & Security Verified:</b> Trusted by Niagara drivers, local tow operators, and used car dealerships for secure, professional immobilizer programming.</li>
                        </ul>
                    </div>
                </div>
                <div style ={{width:cardSize, backgroundColor:"#F5F6FA", margin:"10px"}}>
                    <div style ={{width:"100"+"%",height:"400px", backgroundColor:"black", position:"relative",clipPath: "polygon(0% 0%, 100% 0, 100% 85%,0% 100%)"}}>
                        <img src = {two} style ={{width:"100%",height:"100%"}}></img>
                    </div>
                    <div></div>
                    <div style = {{padding:"5px"}}>
                        <h2>24/7 Mobile Tire Services</h2>
                        <ul>
                            <li><b>On-Site Flat Tire Repair & Replacement: </b>We patch, mount, and balance tires right in your driveway, office parking lot, or on the roadside—no spare tire or tow truck required.</li>
                            <li><b>Seasonal Tire Changeovers at Your Door: </b>Skip the waiting room every spring and fall with convenient, appointment-based tire swaps and wheel balancing at your home or workplace.</li>
                            <li><b>Instant TPMS Sensor Replacement & Programming:</b> We replace faulty tire pressure sensors and clear annoying dashboard warning lights on the spot for almost any make and model..</li>
                            <li><b>Emergency QEW & Regional Highway Response:</b>Fast 24-hour mobile tire rescue across St. Catharines, Thorold, Niagara Falls, Welland, and surrounding areas when a blowout leaves you stranded.</li>
                            <li><b>Commercial Fleet & Dealership Support: </b>Keep your work vans, delivery trucks, and lot inventory moving with rapid on-site tire service that eliminates shop downtime.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <a href= "#contact" style = {{cursor:"pointer",textDecoration:"none", color:"black"}}><button id ="contact" style = {{marginLeft:"1%"}} onClick={showContactForm} className ="function-buttons">Contact Us</button></a>
            <div id = "contact-form" style = {{display:"none"}}>
            <h2>Contact Form</h2>
            <p>If you would like a quote on a locksmithing or tire job, or have any general questions, feel free to reach out!</p>
            <div >
                        <form id = "form" style ={{display: "flex", flexDirection:"column",justifyItems: 'center', justifyContent: "center",flexWrap:"wrap"}}>
                            <div style ={{display: "flex",gap:"0.5vw",justifyContent:"space-evenly",flexWrap:'wrap'}}>
                                <div style ={{display: "flex", flexDirection:"column", width:formFields}}>
                                    <label htmlFor="name">First and Last Name:</label>
                                    <input style = {{borderRadius: "15px",padding: "5px 10px"}}type="user_name" id="user_name" name="user_name" required/>
                                </div>
                                <div style ={{display: "flex", flexDirection:"column",width:formFields}}>
                                    <label htmlFor="email">Email:</label>
                                    <input style = {{borderRadius: "15px", padding: "5px 10px"}} type="user_email" id="user_email" name="user_email" required/>
                                </div>
                                <div style ={{display: "flex", flexDirection:"column",width:formFields}}>
                                    <label htmlFor="email">Phone Number:</label>
                                    <input style = {{borderRadius: "15px", padding: "5px 10px"}} type="phone" id="user_pn" name="user_pn" required/>
                                </div>
                            </div>
                            <br></br>
                            <div style ={{display:"flex",justifyContent:"center"}}>
                                <div style ={{display: "flex", flexDirection:"column", width:"75vw"}}>
                                    <label htmlFor="message">Message:</label>
                                    <textarea style = {{borderRadius: "15px",resize:"none"}}id="user_msg" name="user_msg" rows="5" required defaultValue = {"Hi! I'm interested in you. Is it still available?"}></textarea><br></br>
                                </div>
                            </div>
                            <div style ={{display:"flex",justifyContent:"center"}}>
                                <button style = {{width:"25vw"}} onClick ={submitContactForm}>Send Message</button>
                            </div>
                            <p id = "result"></p>
                        </form>
            </div>
            </div>
            <br></br>
            <br></br>
            <div style ={{backgroundColor:"#14131C", color:"whitesmoke"}}>
                <br></br>
                <h1 style={{marginLeft:"1%",fontSize:secondTitle+"px", color:"whitesmoke"}}>WHY THE NIAGARA REGION CHOOSES US</h1>
                <br></br>
                <div id= "dark-section" style = {{display:"flex", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}>
                <div>
                    <center><div style={{width:bottomImgSize,height:bottomImgSize}}>
                        <img style ={{width:"100%",height:"100%",borderRadius: "25px"}}src={bg_img3} alt="" />
                    </div></center>
                </div>
                    <div style = {{width:darkCardSize}} >
                        <div style= {{display:"flex",backgroundColor:"#191A2A", gap:"1.5vw",padding:"5px 15px", width:"80%", margin:"10px", alignContent:"center"}}>
                            <img src = {trust} style={{transform:`scale(${1.5})`}}></img>
                            <div>
                                <h3>Dealership Expertise, Mobile Convenience</h3>
                                <p>We don't just cut keys; we understand vehicles inside and out. Our locksmith services utilize the exact same database systems that high-end dealerships use</p>
                            </div>
                        </div>
                        <div style= {{display:"flex",backgroundColor:"#191A2A", gap:"1.5vw",padding:"5px 15px", width:"80%", margin:"10px"}}>
                            <img src = {quiet} style={{transform:"scale(1.5)"}}></img>
                            <div>
                                <h3>Zero Mess, Quiet Service</h3>
                                <p>Our custom-engineered mobile workshop uses advanced lithium power and custom sound-baffled equipment, allowing us to service your vehicle quietly in residential neighbourhoods without disrupting your neighbours</p>
                            </div>
                        </div>
                        <div style= {{display:"flex",backgroundColor:"#191A2A", gap:"1.5vw",padding:"5px 15px", width:"80%", margin:"10px"}}>
                            <img src = {family} style={{transform:"scale(1.5)"}}></img>
                            <div>
                                <h3>Local & Family-Owned</h3>
                                <p>Rooted right here in Thorold. We treat our community like family, offering fast response times and upfront, honest pricing with no hidden fees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            <div style ={{height: "8vh",color:"#3A3C41"}}>
                ticker
            </div>
            <div style={{zIndex: "50", position:"fixed",left:"0",bottom:"0", width:"100vw", fontFamily:"sans-serif",fontSize:"5vh"}} className="scroll-left">
            <p>For Emergency Contact, Call (or text): 289-969-1336 </p>
            </div>
        </>
    )
}

export default MainPage