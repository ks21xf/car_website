import { useLoaderData, useNavigate } from 'react-router-dom'

function ContactPage(props){
    const car_data = useLoaderData()
    console.log(car_data)
    return (
        <>
            <h2>Name</h2>

        </>
    )
}

export default ContactPage