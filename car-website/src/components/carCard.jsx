import { useState } from "react";

export default function CarCard(props){
    return(
        <>
            <img src = {"data:image/png;base64,"+props.img}></img>
            <p>Make: {props.make}</p>
            <p>Model: {props.model}</p>
            <p>Year: {props.year}</p>

        </>
    )
}
