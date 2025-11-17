import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Bloge from "../Pages/Bloge/Bloge";
import BlogDetails from "../Pages/Bloge/BlogDetails";
import Author from "../Pages/Author/Author";
import Login from "../Authprovider/Login/Login";
import Registration from "../Authprovider/Registation/Registation";
import NotFound from "../Shared/NotFound/NotFound";
import Books from "../Pages/Books/Books";
import AddBook from "../Pages/Books/AddBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'contact',
          Component:Contact
        },
        {
          path:'about',
          Component:About
        },
        {
          path:'bloge',
          Component:Bloge
        },
        {
        path: "bloge/blogdetails/:id",
       Component:BlogDetails
      },
        {
        path: "author",
       Component:Author
      },
        {
        path: "login",
       Component:Login
      },
        {
        path: "registation",
       Component:Registration
      },
        {
        path: "books",
       Component:Books
      },
        {
        path: "addbook",
       Component:AddBook
      },
       
    ]
  },
   {
    path: "*",
    element: <NotFound />,
  },
]);