import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/opinions.css";
import CountUp from "react-countup";
import axios from "axios";
import { Image } from "react-bootstrap"; // Import necessary components
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import slider1 from "../images/Girl-removebg-preview.png";
import { useLocation } from "react-router-dom";
const settings = {
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 9000,
  dots: true,
  arrows: true, // Enable arrows
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 9000,
      },
    },
  ],
};

// Sample Product Data
const products = [
  {
    id: 1,
    title: "Product 1",
    description:
      "Where ever you go everyone will ask you about what perfume you",
    image: "../images/blog.jpj",
    name: "Rana",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Another awesome product.",
    image: "https://via.placeholder.com/200",
    price: "$59.99",
  },
  {
    id: 3,
    title: "Product 3",
    description: "You will love this product.",
    image: "https://via.placeholder.com/200",
    name: "Malak",
  },
  {
    id: 4,
    title: "Product 4",
    description:
      "Where ever you go everyone will ask you about what perfume you",
    image: "https://via.placeholder.com/200",
    name: "Rana",
  },
  {
    id: 5,
    title: "Product 5",
    description: "A must-have product.",
    image: "https://via.placeholder.com/200",
    name: "Rana",
  },
  {
    id: 6,
    title: "Product 6",
    description:
      "Where ever you go everyone will ask you about what perfume you",
    image: "https://via.placeholder.com/200",
    name: "Malak",
  },
  {
    id: 7,
    title: "Product 7",
    description:
      "Where ever you go everyone will ask you about what perfume you",
    image: "https://via.placeholder.com/200",
    name: "Malak",
  },
  {
    id: 8,
    title: "Product 8",
    description:
      "Where ever you go everyone will ask you about what perfume you",
    image: "https://via.placeholder.com/200",
    name: "Malak",
  },
  {
    id: 9,
    title: "Product 9",
    description: "A fantastic product.",
    image: "https://via.placeholder.com/200",
    name: "Malak",
  },
  {
    id: 10,
    title: "Product 10",
    description:
      "Where ever you go everyone will ask you about what perfume you",
    image: "https://via.placeholder.com/200",
    name: "Malak",
  },
];
function Opinions() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [theme] = useThemeHook();
  const [customerOptions, setCustomerOptions] = useState([]);
useEffect(()=>{
const fetchCustomerOptions =async ()=>{
  try{
    const response = await axios.get(`${API_URL}/feedback/getFeedback`);
    setCustomerOptions(response.data)
  }catch(error){
    console.log(error);
  }
}
fetchCustomerOptions()
},[])
  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section full-screen-slider "
          : "bg-light text-black margin_section full-screen-slider"
      }
      data-aos="fade-up"
    >
      <div className="container-fluid text-center ">
        <h3
          className={
            theme
              ? "text-light we_help_you_home mt-5"
              : "text-black we_help_you_home mt-5"
          }
        >
          {" "}
          {lang === "ar" ? "اراء العملاء" : "LET CUSTOMERS SPEAK FOR US"}
        </h3>

        <div className="row mt-5">
          <Slider
            {...settings}
            style={{ overflow: "hidden" }}
            className="slide"
          >
            {customerOptions.map((product) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 product-opinion mb-5"
                key={product.id}
              >
                {/* Title and price section */}
                <h4 className={theme ? "text-light " : "text-black"}>
                  {product.product_name}
                </h4>
                <p className={theme ? "text-light" : "text-black"}>
                  {product.message}
                </p>
                <h6 className="name-opinion">{product.first_name} {product.last_name}</h6>

                <Image
                  src={`${API_URL}/${product.product_image}`}
                  className="opinion_img_home"
                  alt="First slide"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Opinions;
