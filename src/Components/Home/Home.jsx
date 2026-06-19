import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import BookCategory from '../BookCatagory/BookCatagory';
import Discount from '../Discount/Discount';
import Advertise from '../Advertise/Advertise';
import Feedback from '../Feedback/Feedback';
import axios from 'axios';
import PopularBooks from '../PopularBooks/PopularBooks';
import RelizonBook from '../RelizonBook/RelizonBook';
import ChildBooks from '../ChildBooks/ChildBooks';

const Home = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const [religiousBooks, setReligiousBooks] = useState([]);
    const [childBooks, setChildBooks] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/books?category=Popular")
            .then((res) => setPopularBooks(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3000/books?category=Religious")
            .then((res) => setReligiousBooks(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3000/books?category=Child")
            .then((res) => setChildBooks(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <Banner />
            <BookCategory />
            <PopularBooks popularBooks={popularBooks} />
            <RelizonBook religiousBooks={religiousBooks} />
            <ChildBooks childBooks={childBooks} />
            <Discount />
            <Advertise />
            <Feedback />
        </div>
    );
};

export default Home;