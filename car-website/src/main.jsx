import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Test from './components/test.jsx'
import { createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,

  },
  {
    path: "/test",
    element:<Test></Test>,
    loader: async () =>{
      const response = await fetch("http://localhost:5000/api/cars")
      if (!response.ok) throw new Error("Failed to fetch cars");
      return await response.json()
    }
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}></RouterProvider>
  </StrictMode>,
)
