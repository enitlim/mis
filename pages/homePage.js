import { Button } from '@mui/material';
import Link from 'next/link'
import React from 'react'
import axios from "axios";
const HomePage = () => {
  const handleClick = async() => {
    let token=localStorage.getItem("access_token");
    const config={
      headers:{Authorization:  `Bearer ${token}`}
    }
    try {
      const request =await axios.get("http://localhost:8000/protected-route/", config);
      console.log(request.data);
    } catch (error) {
      console.log("Couldn't get access token", error.request?.data);
    }
  }
  return (
    <>
    <div>
        <Link href="/annual_returns/ar26">Annul Return</Link>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Click Me
        </Button>
    </div>
    </>
  )
}

export default HomePage;