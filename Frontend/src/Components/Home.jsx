import React from 'react'
import Hero from './Hero'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import InfoCards from './InfoCards'
import CountValues from './CountValues'
import Ticket from './Ticket'
import Footer from './Footer'
import axios from "axios";
import useRegistration from '../Store/useRegistration.jsx';
import { USER_BACKEND_URL } from '../Constant.jsx';


const Home = () => {

  const { login, logout } = useRegistration();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${USER_BACKEND_URL}/me`, { withCredentials: true });
        if (response.data.success && response.data.user) {
          login();
        } else {
          logout();
        }
      } catch (err) {
        logout(); // invalid or expired token
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      <Hero />
      <Outlet />
      <InfoCards />
      <CountValues />
      <Ticket />
      <Footer />
    </>
  )
}

export default Home