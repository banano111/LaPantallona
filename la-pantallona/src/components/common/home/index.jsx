import React from 'react';
import Logo from '../../../assets/Logo_LaPantallona.png';

export default function Home (){
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <img src={Logo} alt="ImagenLogo" width="700px" height="250px" />
        </div>
    );
};
