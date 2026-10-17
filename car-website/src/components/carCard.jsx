import { useState } from "react";

export default function CarCard(props){
    console.log(props.img)
    var numImages = props.numImages
    const [imgCounter,setImgCounter] = useState(1)
    return(
        <>
            <img src = {props.img+imgCounter+".jpg"} onClick = {()=>{
                setImgCounter(imgCounter+1)
            }}></img>
            <p>Make: {props.make}</p>
            <p>Model: {props.model}</p>
            <p>Year: {props.year}</p>

        </>
    )
}
