import React from 'react';
import Banner from '../Banner/Banner';
import BookCategory from '../BookCatagory/BookCatagory';
import Discount from '../Discount/Discount';
import Advertise from '../Advertise/Advertise';
import Feedback from '../Feedback/Feedback';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <BookCategory></BookCategory>
        {/* <PopularBooks></PopularBooks> */}
        <Discount></Discount>
        <Advertise></Advertise>
        <Feedback></Feedback>
        </div>
    );
};

export default Home;