import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { Row, Col, Button, Image } from "react-bootstrap";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import slider1 from "../images/gift.webp"; // Fallback image
import { Link, useParams } from "react-router-dom";
import YouMayAlsoLike from "./YouMayAlsoLike";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuShare2 } from "react-icons/lu";
const GiftDetails = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);
  const [theme] = useThemeHook();
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const { addItem } = useCart();
  const [giftCard, setGiftCard] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentImage, setCurrentImage] = useState(
    selectedProduct?.image || slider1
  );

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = (value, image) => {
    setActiveButton(value);
    setCurrentImage(image); // Change image based on button click
  };

  const handleGiftChange = () => {
    setIsGift(!isGift); // Toggle gift form visibility
  };

  // Handle quantity increase and decrease
  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const getGifts = async () => {
      const res = await axios.get(`${API_URL}/giftcard/${id}`);
      setGiftCard(res.data);
      console.log(res.data);
    };
    getGifts();
  }, []);
  const shareProduct = (gift) => {
    const shareMessage = `Check out this product: ${gift.title} \n ${API_URL}/giftDetails/${gift.id}`;
    const mailtoLink = `mailto:?subject=Check out this product!&body=${encodeURIComponent(
      shareMessage
    )}`;
    window.open(mailtoLink, "_self");
  };
  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section full-screen-slider m-5"
          : "bg-light text-black margin_section full-screen-slider m-5"
      }
    >
      {giftCard.map((gift) => (
        <Row
          className={
            theme ? "m-5 bg-light-black text-light" : "m-5 bg-light text-black "
          }
        >
          <Col xs={12} md={6} lg={6}>
            <div className="image-container">
              <Image
                src={`${API_URL}/${gift.img}`}
                className="img-fluid "
                alt="Product Image"
                style={{ height: "25rem", width: "100%", objectFit: "contain" }}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <h2>{gift.title}</h2>

            <div className={`${theme ? "text-dark-primary" : ""}`}>
              Price: {gift.amount}
            </div>
            <div className={`${theme ? "text-dark-primary" : ""}`}>
              Taxes included.
            </div>
            <div className={`mt-2 ${theme ? "text-dark-primary" : ""}`}>
              Denominations
            </div>

            <div className="d-flex justify-content-between flex-wrap mt-3">
              <Button
                type="submit"
                onClick={() => handleButtonClick(10, slider1)} // Set active to 10 and change image
                className={`${theme ? "text-black" : ""} px-4 py-2 mt-1 ${
                  activeButton === 10
                    ? "bg-light-primary text-white"
                    : "bg-dark-primary text-black"
                }`}
                style={{ border: 0 }}
              >
                JOD {gift.amount}
              </Button>
            </div>

            <div className={`mt-2 ${theme ? "text-dark-primary" : ""}`}>
              Quantity
            </div>
            <div className="d-flex mt-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("decrease")}
              >
                <FiMinus size="1.4rem" />
              </button>
              <span className="m-2">{quantity}</span>{" "}
              {/* Display current quantity */}
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("increase")}
              >
                <IoMdAdd size="1.4rem" />
              </button>
            </div>

            {/* Gift Checkbox */}
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckGift"
                checked={isGift}
                onChange={handleGiftChange} // Show/hide gift form
              />
              <label className="form-check-label" htmlFor="flexCheckGift">
                I want to send this as a gift
              </label>
            </div>

            {/* Conditional Rendering of Gift Form */}
            {isGift && (
              <div className="mt-3">
                {/* Recipient Email */}
                <div className="form-group mt-3">
                  <input
                    type="email"
                    id="recipientEmail"
                    className={
                      theme ? "form-control" : "form-control text-dark bg-light"
                    }
                    placeholder="Enter recipient's email"
                  />
                </div>
                {/* Recipient Name */}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    id="recipientName"
                    className={
                      theme ? "form-control" : "form-control text-dark bg-light"
                    }
                    placeholder="Enter recipient's name"
                  />
                </div>
                {/* Gift Message */}
                <div className="form-group mt-3">
                  <textarea
                    id="giftMessage"
                    className={
                      theme ? "form-control" : "form-control text-dark bg-light"
                    }
                    rows="3"
                    placeholder="Enter a gift message"
                  />
                </div>

                {/* Delivery Date */}
                <div className="form-group mt-3">
                  <input
                    type="date"
                    id="deliveryDate"
                    className={
                      theme ? "form-control" : "form-control text-dark bg-light"
                    }
                    placeholder="Select a delivery date"
                  />
                </div>
              </div>
            )}
            <Button
               onClick={() => {
                // Ensure you pass the necessary properties to addItem
                addItem({
                  id: gift.id,
                  title: gift.title,
                  price: gift.amount,
                  quantity: quantity,
                  first_image: `${API_URL}/${gift.img}`,
                });
                    }}
              type="button"
              className={`${
                theme ? "bg-dark-primary text-black" : "bg-light-primary"
              } px-4 py-2 mt-5 w-50`}
              style={{ border: 0, textAlign: "center" }}
            >
              {" "}
              ADD TO CART
            </Button>
            <div className={`mt-5  ${theme ? "text-dark-primary " : ""}`}>
              Remember your loved ones with our gift card vouchers, where you
              can give them the flexibility to choose what they most among
              various options from our products{" "}
            </div>

            <div className={`mt-5  ${theme ? "text-light" : "text-black"}`}>
              <span className="ms-1">
                {" "}
                <LuShare2 size="1.2rem" />
              </span>
              <Link
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  shareProduct(giftCard); // Call the share function
                }}
                className={` ${theme ? "text-light" : "text-black"}`}
                style={{ textDecoration: "none" }}
              >
                Share
              </Link>
            </div>
          </Col>
        </Row>
      ))}
      {/* You May Also Like Section */}
      <YouMayAlsoLike main_product_type="Fragrance" />
    </section>
  );
};

export default GiftDetails;
