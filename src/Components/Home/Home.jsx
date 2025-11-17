import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import BookCategory from '../BookCatagory/BookCatagory';
import Discount from '../Discount/Discount';
import Advertise from '../Advertise/Advertise';
import Feedback from '../Feedback/Feedback';
import axios from 'axios';
import PopularBooks from '../PopularBooks/PopularBooks';
import RelizonBook from '../RelizonBook/RelizonBook';

const Home = () => {
    const [popularBooks, setPopularBooks] = useState([]);
      const [religiousBooks, setReligiousBooks] = useState([]);
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
    return (
        <div>
        <Banner></Banner>
        <BookCategory></BookCategory>
          <PopularBooks popularBooks={popularBooks} />
          <RelizonBook religiousBooks={religiousBooks} />
        <Discount></Discount>
        <Advertise></Advertise>
        <Feedback></Feedback>
        </div>
    );
};

export default Home;