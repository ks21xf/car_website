import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import './App.css'
import CarCard from './components/CarCard'


function App() {
    const [cars,setCars] =useState([])
    const [img,setImg] = useState([])

    const [cars_data,img_data] = useLoaderData()
    console.log(cars_data)
    console.log(img_data)
    useEffect(()=>{
        if(cars_data){
            setCars(cars_data)
        }if(img_data){
            const im = img_data.image+""
            const t =atob(im)
            setImg(im)
        }
    },[cars_data])

  return (
    <>
        {cars.map((car) => (
          <CarCard key={car.cid} make = {car.make} model = {car.model} year = {car.year} img ={img} ></CarCard>
        ))}
    </>
  )
}

export default App
