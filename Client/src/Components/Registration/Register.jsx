import React from 'react'
import {Navbar} from '../Home/Navbar.jsx'
import{Footer} from '../Home/Footer.jsx'

import Registration from './RegistrationForm.jsx'

export function Register() {
    return (
        
       <>         
        <Navbar />
        <Registration/>
        <Footer/>     
       </>

    )
}
