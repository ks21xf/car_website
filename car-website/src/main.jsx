import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MainPage from './main_page.jsx'
import Car from './car.jsx'
import Test from './components/test.jsx'
import { createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
    path: "/cars/:id",
    element: <Car></Car>,
    loader: async ({params} ) =>{
      const { id } = params;
      const response = await fetch("http://localhost:5000/api/getcar?cid="+id)
      if (!response.ok) throw new Error("Failed to fetch cars");
      return await response.json()
    }
  },
  {
    path: "/mainpage",
    element: <MainPage></MainPage>,
    loader: async () =>{
      const response = await fetch("http://localhost:5000/api/cars")
      if (!response.ok) throw new Error("Failed to fetch cars");
      return await response.json()
  }
  },
  {
    path: "/",
    element: <App></App>,
    loader: async () =>{
      const response = await fetch("http://localhost:5000/api/cars")
      if (!response.ok) throw new Error("Failed to fetch cars");
      return await response.json()
    }
  },
  {
    path: "/test",
    element:<Test></Test>,
    loader: async () =>{
      const response = await fetch("http://localhost:5000/api/cars")
      if (!response.ok) throw new Error("Failed to fetch cars");
      return await response.json()
    }
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}></RouterProvider>
  </StrictMode>,
)

/**
 * loader: async () =>{

      //we want to fetch car data and image data so do this to do it concurrently
      const [carResponse, imgResponse] = await Promise.all([
        fetch("http://localhost:5000/api/cars"),
        fetch("http://localhost:5000/api/imgs")
      ]);


      if (!carResponse.ok || !imgResponse.ok) {
        throw new Response("Failed to load data", { status: 500 });
      }

      //parse
      const [carData, imgData] = await Promise.all([
        carResponse.json(),
        imgResponse.json(),
      ]);
      return [carData, imgData]
    }
 */