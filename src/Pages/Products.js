import React, { useState } from 'react';
import "../Css/allproducts.css";
import { Image } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import slider1 from '../images/girl2-removebg-preview.png';
import hoverImage from '../images/WATCHES-removebg-preview.png'; 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Container, Row, Col , Form} from 'react-bootstrap';
import { IoFilterCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

// Sample Product Data
const products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'This is a great product This is a great product.', 
      image: '../images/blog.jpj',
      price: '$49.99',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Another awesome product This is a great product.',
      image: 'https://via.placeholder.com/200',
      price: '$59.99',
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'You will love this product This is a great product.',
      image: 'https://via.placeholder.com/200',
      price: '$29.99',
    },
    {
      id: 4,
      title: 'Product 4',
      description: ' Our latest collection Our latest collection Our latest collection.',
      image: 'https://via.placeholder.com/200',
      price: '$39.99',
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'A must-have product.Our latest collectionOur latest collection Our latest collection',
      image: 'https://via.placeholder.com/200',
      price: '$89.99',
    },
    {
      id: 6,
      title: 'Product 6',
      description: 'Another great product.',
      image: 'https://via.placeholder.com/200',
      price: '$79.99',
    },
    {
      id: 7,
      title: 'Product 7',
      description: 'An amazing product.',
      image: 'https://via.placeholder.com/200',
      price: '$99.99',
    },
    {
      id: 8,
      title: 'Product 8',
      description: 'A stylish product.',
      image: 'https://via.placeholder.com/200',
      price: '$39.99',
    },
    {
      id: 9,
      title: 'Product 9',
      description: 'A fantastic product.',
      image: 'https://via.placeholder.com/200',
      price: '$69.99',
    },
    {
      id: 10,
      title: 'Product 10',
      description: 'This is a unique product This is a unique product This is a unique product This is a unique product.',
      image: 'https://via.placeholder.com/200',
      price: '$119.99',
    },
    {
        id: 11,
        title: 'Product 1',
        description: 'This is a great product.', 
        image: '../images/blog.jpj',
        price: '$49.99',
      },
      {
        id: 12,
        title: 'Product 2',
        description: 'Another awesome product.',
        image: 'https://via.placeholder.com/200',
        price: '$59.99',
      },
      {
        id: 13,
        title: 'Product 3',
        description: 'You will love this product.',
        image: 'https://via.placeholder.com/200',
        price: '$29.99',
      },
      {
        id: 14,
        title: 'Product 4',
        description: 'Our latest collection.',
        image: 'https://via.placeholder.com/200',
        price: '$39.99',
      },
      {
        id: 15,
        title: 'Product 5',
        description: 'A must-have product.',
        image: 'https://via.placeholder.com/200',
        price: '$89.99',
      },
      {
        id: 16,
        title: 'Product 6',
        description: 'Another great product.',
        image: 'https://via.placeholder.com/200',
        price: '$79.99',
      },
      {
        id: 17,
        title: 'Product 7',
        description: 'An amazing product.',
        image: 'https://via.placeholder.com/200',
        price: '$99.99',
      },
      {
        id: 18,
        title: 'Product 8',
        description: 'A stylish product.',
        image: 'https://via.placeholder.com/200',
        price: '$39.99',
      },
      {
        id: 19,
        title: 'Product 9',
        description: 'A fantastic product.',
        image: 'https://via.placeholder.com/200',
        price: '$69.99',
      },
      {
        id: 20,
        title: 'Product 10',
        description: 'This is a unique product.',
        image: 'https://via.placeholder.com/200',
        price: '$119.99',
      },
  ];
// Set items per page to 16
const ITEMS_PER_PAGE = 16;

function Products() {
    const [theme] = useThemeHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isCanvasOpen, setCanvasOpen] = useState(false);
    
    const toggleCanvas = () => {
        setCanvasOpen(!isCanvasOpen);
    };
    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };


     // Safeguard to ensure products is defined before accessing its length
     const validProducts = Array.isArray(products) ? products : [];

     // Calculate the total number of pages
     const totalPages = Math.ceil(validProducts.length / ITEMS_PER_PAGE);
 
     // Get current products for the active page
     const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
     const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
     const currentProducts = validProducts.slice(indexOfFirstProduct, indexOfLastProduct);
 
     // Handle page navigation
     const handleNextPage = () => {
         if (currentPage < totalPages) {
             setCurrentPage(currentPage + 1);
         }
     };
 
     const handlePreviousPage = () => {
         if (currentPage > 1) {
             setCurrentPage(currentPage - 1);
         }
     };

    return (
        <section className={theme ? 'bg-light-black text-light margin_section full-screen-slider' : 'bg-light text-black margin_section full-screen-slider'} data-aos="fade-up">
            <div className="container text-center container-all">
            <Row className="justify-content-between content-filter">
                <Col lg={8} className="mb-lg-0">
                    <div className="d-flex justify-content-between">
                   
                     
                    {/* Toggle Button for Offcanvas */}
                    <Link  
                    className={`nav-link link-filter mt-3 ${theme ? 'text-dark-primary' : 'text-light-primary'}`}
                   
                    onClick={toggleOffcanvas}>
                         <IoFilterCircleOutline size="1.4rem"/>  Filter & Sort
                    </Link>
                
                
                    </div>
                </Col>
                <Col lg={4} className=" mb-lg-0">
                    <ul className="list-unstyled d-none d-md-flex justify-content-start mt-3">
                        <li className={`me-3 title-filter mt-1 ${theme ? 'text-dark-primary' : 'text-light-primary'}`}>
                            Sort by:
                        </li>
                        <li className="me-3">
                            <select className={`form-select  ${theme ? 'bg-light-black text-dark-primary' : 'bg-light text-light-primary'}`}
                          
                            style={{ border: "none" }}
                            >
                                <option value="">Best selling</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="furniture">Furniture</option>
                                {/* Add more categories as needed */}
                            </select>
                        </li>
                        <li className={`me-3 title-filter mt-1 ${theme ? 'text-dark-primary' : 'text-light-primary'}`}>
                        644 products
                        </li>
                    </ul>
                </Col>
                
                <Col lg={4} className="mb-lg-0">
    {/* For smaller screens */}
    <ul className="list-unstyled d-flex m-2 justify-content-start d-md-none">
        <li className={`me-3 title-filter ${theme ? 'text-dark-primary' : 'text-light-primary'}`}>
            644 products
        </li>
    </ul>
</Col>
                   
            </Row>

            {/* Offcanvas Component */}
            <div 
    className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''} ${theme ? 'bg-light-black' : 'bg-light'}`} 
    tabIndex="-1" 
    id="offcanvasRight" 
    aria-labelledby="offcanvasRightLabel" 
    style={{ visibility: isOpen ? 'visible' : 'hidden' }}
>
                <div className="offcanvas-header">
                    <h5 className={`offcanvas-title ${theme ? 'text-light' : 'text-black'}`} id="offcanvasRightLabel">Filters and Sort</h5>
                    <button type="button" className="btn-close" onClick={toggleOffcanvas} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/* Filter Options in Offcanvas */}
                    <ul className="list-unstyled">
                        {/* <h4 className={` mt-1 ${theme ? 'text-light' : 'text-black'}`}>
                            Filter:
                        </h4> */}
                        {["Availability", "Price", "Brand", "Size", "Product type"].map(option => (
                            <li key={option} className=" mt-5">
                                <select className={`form-select custom-select ${theme ? 'bg-light-black text-light' : 'bg-light text-black'}`}>
                                    <option value="">{option}</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="furniture">Furniture</option>
                                </select>
                            </li>
                        ))}
                    </ul>
                    {/* Sort Options in Offcanvas */}
                    <ul className="list-unstyled mt-3">
                        {/* <li className={`title-filter mt-1 ${theme ? 'text-light' : 'text-black'}`}>
                            Sort by:
                        </li> */}
                        <li className="me-5">
                            <select className={`form-select custom-select ${theme ? 'bg-light-black text-light' : 'bg-light text-black'}`}>
                                <option value="">Best selling</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="furniture">Furniture</option>
                                {/* Add more categories as needed */}
                            </select>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Backdrop for Offcanvas */}
            {isOpen && <div className="offcanvas-backdrop fade show" onClick={toggleOffcanvas}></div>}
            <div className="row mt-5 justify-content-center">
  {currentProducts.map((product) => (
    <div className="col-lg-3 col-md-4 col-sm-12 product-allcard mb-5" key={product.id}>
      
      {/* Add a flex container to wrap the product content */}
      <div className="product-content d-flex flex-column h-100">

        {/* Image and Sale Button */}
        <div className="image-container">
          <Image
            src={slider1}
            className="img-fluid img_all m-3 product-image"
            alt="First slide"
          />
          <button className={theme ? 'text-light btn-top-left' : 'text-black btn-top-left'}>
            Sale
          </button>
        </div>

        {/* Description and Price */}
        <h6 className={theme ? 'text-light' : 'text-black'}>{product.description}</h6>
        <p className={theme ? 'text-light ' : 'text-black'}>
          {product.price}
          <del className="original-price">{product.price}</del>
        </p>

        {/* Push button to the bottom */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={toggleCanvas}
            className={theme ? 'text-light btn btn-card' : 'text-black btn btn-card'}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      
    </div>
  ))}
</div>

                {/* Pagination Controls */}
                <div className="pagination-controls m-5">
                    <a href="#" onClick={handlePreviousPage} className={currentPage === 1 ? "disabled-link mx-2" : "mx-2"}>
                        <IoIosArrowBack size={20} />
                    </a>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <a href="#" onClick={handleNextPage} className={currentPage === totalPages ? "disabled-link mx-2" : "mx-2"}>
                        <IoIosArrowForward size={20} />
                    </a>
                </div>
            </div>
       
        </section>
    );
}

export default Products