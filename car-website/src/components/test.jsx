import { useState,useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import CarCard from './CarCard'

function Test() {
    const [cars,setCars] =useState([])
    const cardat = [
            { cid: 1, make: 'Chevy', model: 'Cruze', year: "2014" },
            { cid: 2, make: 'Ford', model: 'Focus', year: "2015" },
        ];
    const cars_data = useLoaderData()
    useEffect(()=>{
        if(cars_data){
            setCars(cars_data)
        }
    },[cars_data])

  return (
    <>
        {cars.map((car) => (
          <CarCard key={car.cid} make = {car.make} model = {car.model} year = {car.year}></CarCard>
        ))}
    </>
  )
}

export default Test
