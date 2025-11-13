import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import SubNavbar from '../../Shared/Navbar/SubNavbar';
import Footer from '../../Shared/Footer/Footer';
import Banner from '../Banner/Banner';
import BookCategory from '../BookCatagory/BookCatagory';
import Discount from '../Discount/Discount';
import Advertise from '../Advertise/Advertise';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <BookCategory></BookCategory>
        {/* <PopularBooks></PopularBooks> */}
        <Discount></Discount>
        <Advertise></Advertise>
        </div>
    );
};

export default Home;