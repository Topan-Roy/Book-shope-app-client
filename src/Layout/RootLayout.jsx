import React from 'react';

import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';


const RootLayout = () => {
    return (
        <div className='w-full  bg-gray-100 dark:text-black dark:bg-white 2xl:mx-auto overflow-x-hidden'>

            <Navbar></Navbar>
            <div className="lg:pt-40 md:pt-32">
                <Outlet></Outlet>
            </div>


            <Footer></Footer>
        </div>
    );
};

export default RootLayout;