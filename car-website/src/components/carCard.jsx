import { useState } from "react";

export default function CarCard(props){
    console.log("h"+props.id)
    return(
        <>
            <p>Make: {props.make}</p>
            <p>Model: {props.model}</p>
            <p>Year: {props.year}</p>

        </>
    )
}
