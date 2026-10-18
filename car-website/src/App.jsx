import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
//import './App.css'
import CarCard from './components/CarCard'


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
        {cars.map((car) => (
          <CarCard key = {car.cid} car = {car} ></CarCard>
        ))}
    </>
  )
}

export default App
