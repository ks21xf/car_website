import { useLoaderData } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/header.jsx'
import Footer from './components/footer.jsx';
import bg_img from './assets/main-page-background.jpg';
import bg_img2 from './assets/main-page-bg-2_0.jpg';
import bg_img3 from './assets/main-page-bg-3.jpg';
import one from './assets/ket_cut.jpg';
import two from './assets/tire_repair.jpg';
import three from './assets/scanner.jpg';
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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [seeThru, setSeeThru] = useState("40")
    const [seeThruHeight, setseeThruHeight] = useState("90")


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
            setSeeThru("40")
            setseeThruHeight("90")

        }else{
            setSeeThru("100")
            setseeThruHeight("120")
        }
    },[windowWidth]);
    return (
        <>
            <Header></Header>
            <div style = {{width:"100%",height:`${seeThruHeight}vh`, position:"relative",overflowX: "clip"}}>
                <div style = {{width:`${seeThru}%`,height:"100%", zIndex:"30", background:"rgba(3,3,3,0.8)",position:"absolute"}}>
                    <br></br>
                    <center><h1 style = {{color: "whitesmoke", fontSize:"60px"}}>406 Auto Parts</h1></center>
                    <br></br>
                    <center><p className='para'>Niagara’s Complete Automotive Hub: Quality Used Vehicles & 24/7 Mobile Roadside Service</p></center>
                    <br></br>
                    <center><p className='para'>From buying your next reliable vehicle to getting you back on the road when you’re stranded, we’ve got you covered. Certified pre-owned cars, precision key replacement, and on-site tire repair—delivered straight to your driveway.</p></center>
                    <center><button className ="links function-buttons" onClick={navigateToCatalogue}>View Catalogue</button></center>
                    <br></br>
                    <center><button className ="links function-buttons">Locksmithing</button></center>
                    <br></br>
                    <center><button  style = {{backgroundColor:"#ED1C24"}}className ="links function-buttons">Call or Text: 289-969-1336</button></center>

                </div>
                <img src = {bg_img} style = {{width:"100%",height: "100%"}}></img>
            </div>
            <br></br>
            <h1 style={{marginLeft:"1%",fontSize:"4vw"}}>OUR SERVICES AT A GLANCE</h1>
            <br></br>
            <h1 className ="offset">Professional Mobile Roadside Services</h1>
            <p className ="offset">Our mobile workshop comes right to your home, workplace, or the side of the highway to handle precision tire repairs on the spot.</p>
            <div style = {{marginLeft:"1%",display:"flex", justifyContent: "space-evenly", flexWrap:"wrap"}}>
                <div style ={{width:"400px", backgroundColor:"#F5F6FA", margin:"10px"}}>
                    <div style ={{width:"400px",height:"400px", backgroundColor:"black", position:"relative",clipPath: "polygon(0% 0%, 100% 0, 100% 85%,0% 100%)"}}>
                        <img src = {one} style ={{width:"100%",height:"100%"}}></img>
                    </div>
                    <div style = {{padding:"5px"}}>
                        <h2>Automotive Locksmithing</h2>
                        <p>All keys lost? Need a spare? We cut laser keys and program high-security transponders, proximity fobs, and smart keys on-site using advanced computer calibration, saving you expensive dealership towing fees.</p>
                    </div>
                </div>
                <div style ={{width:"400px", backgroundColor:"#F5F6FA", margin:"10px"}}>
                    <div style ={{width:"400px",height:"400px", backgroundColor:"black", position:"relative",clipPath: "polygon(0% 0%, 100% 0, 100% 85%,0% 100%)"}}>
                        <img src = {two} style ={{width:"100%",height:"100%"}}></img>
                    </div>
                    <div></div>
                    <div style = {{padding:"5px"}}>
                        <h2>TPMS Sensor Programming</h2>
                        <p>Flashing tire pressure light? We diagnose, program, and replace Tire Pressure Monitoring System sensors right on your vehicle.</p>
                    </div>
                </div>
                <div style ={{width:"400px", backgroundColor:"#F5F6FA", margin:"10px"}}>
                    <div style ={{overflow: "hidden",width:"400px",height:"400px", backgroundColor:"black", position:"relative",clipPath: "polygon(0% 0%, 100% 0, 100% 85%,0% 100%)"}}>
                        <img src = {three} style ={{borderRadius:"20px 20px 0 0",width:"100%",height:"100%"}}></img>
                    </div>
                    <div style = {{padding:"5px"}}>
                        <h2>On-Site Tire Repair & Balancing</h2>
                        <p>Plugs, patches, and precision wheel balancing done right in your driveway. We find microscopic leaks instantly using professional foaming micro-surfactants.</p>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div style = {{display:"flex", justifyContent: "flex-end",width:"100%",height:"90vh", position:"relative",overflowX: "clip"}}>
                <div style = {{width:`${seeThru}%`,height:"100%", zIndex:"30", position:"relative", float:"right", background:"rgba(3,3,3,0.8)",position:"absolute", display:"flex", flexDirection:"column",alignItems:"center"}}>
                    <br></br>
                    <h1 className ="offset para">Trusted Used Car Dealership</h1>
                    <br></br>
                    <p className ="offset para">Skip the franchise headaches. We sell high-quality, fully inspected, and certified pre-owned vehicles tailored to your budget.</p>
                    <br></br>
                    <div class="offset numberlist" >
                        <ol>
                            <li>Fully Certified and Safety-Inspected Vehicles</li>
                            <li>Transparent, Hassle-Free Buying Experience</li>
                            <li>Trade-ins Welcome</li>
                        </ol>
                    </div>
                </div>
                <img src = {bg_img2} style = {{width:"100%",height: "100%"}}></img>
            </div>
            <div style ={{backgroundColor:"#14131C", height:"800px", color:"whitesmoke"}}>
                <br></br>
                <h1 style={{marginLeft:"1%",fontSize:"4vw", color:"whitesmoke"}}>WHY THE NIAGARA REGION CHOOSES US</h1>
                <br></br>
                <div style = {{display:"flex", justifyContent:"space-evenly"}}>
                    <div>
                        <div style= {{display:"flex",backgroundColor:"#191A2A", gap:"1.5vw",padding:"5px 15px", width:"35vw", margin:"10px"}}>
                            <img src = {trust} style={{transform:"scale(1.5)"}}></img>
                            <div>
                                <h3>Dealership Expertise, Mobile Convenience</h3>
                                <p>We don't just cut keys; we understand vehicles inside and out. Our locksmith services utilize the exact same database systems that high-end dealerships use</p>
                            </div>
                        </div>
                        <div style= {{display:"flex",backgroundColor:"#191A2A", gap:"1.5vw",padding:"5px 15px", width:"35vw", margin:"10px"}}>
                            <img src = {quiet} style={{transform:"scale(1.5)"}}></img>
                            <div>
                                <h3>Zero Mess, Quiet Service</h3>
                                <p>Our custom-engineered mobile workshop uses advanced lithium power and custom sound-baffled equipment, allowing us to service your vehicle quietly in residential neighbourhoods without disrupting your neighbours</p>
                            </div>
                        </div>
                        <div style= {{display:"flex",backgroundColor:"#191A2A", gap:"1.5vw",padding:"5px 15px", width:"35vw", margin:"10px"}}>
                            <img src = {family} style={{transform:"scale(1.5)"}}></img>
                            <div>
                                <h3>Local & Family-Owned</h3>
                                <p>Rooted right here in Thorold. We treat our community like family, offering fast response times and upfront, honest pricing with no hidden fees</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{width:"25vw",height:"25vw",transform:"rotate(-15deg)"}}>
                            <img style ={{width:"100%",height:"100%",borderRadius: "25px"}}src={bg_img3} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default MainPage