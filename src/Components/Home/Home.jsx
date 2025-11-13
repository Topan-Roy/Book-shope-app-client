import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import SubNavbar from '../../Shared/Navbar/SubNavbar';
import Footer from '../../Shared/Footer/Footer';
import Banner from '../Banner/Banner';
import BookCategory from '../BookCatagory/BookCatagory';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <BookCategory></BookCategory>
        </div>
    );
};

export default Home;