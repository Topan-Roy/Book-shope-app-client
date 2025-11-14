import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Bloge from "../Pages/Bloge/Bloge";
import BlogDetails from "../Pages/Bloge/BlogDetails";

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
    ]
  },
]);