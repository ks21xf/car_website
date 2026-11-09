import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
//import './App.css'
import CarCard from './components/CarCard'
import Header from './components/header.jsx'


function App() {
    const [cars,setCars] =useState([])
    const [img,setImg] = useState([])

    const cars_data = useLoaderData()
    useEffect(()=>{
        if(cars_data){
            //cars_data.imgs = "https://dw9t7u20zbhyg.cloudfront.net/car_img_data/"
            setCars(cars_data)
        }
    },[cars_data])

  return (
    <>
        <Header></Header>
        <center><h1 style ={{fontSize: "max(2rem,2vw)"}}>Vehicle Catalogue</h1></center>
        <div style = {{display:"flex",gap: "20px",justifyContent: "center" , alignItems: "center", flexWrap: "wrap"}}>
          {cars.map((car) => (
            <CarCard key = {car.cid} car = {car} ></CarCard>
          ))}
        </div>
    </>
  )
}

export default App
