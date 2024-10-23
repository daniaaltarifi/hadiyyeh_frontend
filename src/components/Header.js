import React, { useContext, useState, useEffect } from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { ThemeContext } from "../GlobalComponents/ThemeProvider";
import { BiSun, BiMoon, BiCart } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";

import { useCart } from "react-use-cart";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Css/header.css";
import { IoIosSearch } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiTiktokFill } from "react-icons/ri";
import { MdGTranslate } from "react-icons/md";
import Logo from "../images/Logo.avif";
import RightCart from "./RightCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BrandsData from "./BrandsData";
import axios from "axios";
import FetchCartData from "./FetchCardData";

const Header = ({ cartItems, onProductTypeChange }) => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme);
  const [showBanner, setShowBanner] = useState(true); // State for the banner visibility
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const { brands } = BrandsData();
  const [seasons, setseasons] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const lang = location.pathname.split("/")[1] || "en";
  const { cart, user } = FetchCartData();
  const [allproductData, setAllproductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState(lang);
  const [banners, setBanners] = useState([]);
  const handleSelection = (event) => {
    const newLang = event.target.value;
    setSelectedOption(newLang);
    // Construct the new URL with the new language
    const newPath = `/${newLang}${location.pathname.substring(
      lang.length + 1
    )}`; // Adjust path for new language
    navigate(newPath);
  };
  // Optionally, update the selected option if the language in the URL changes (e.g., through manual URL entry)
  useEffect(() => {
    setSelectedOption(lang);
    const fetchSeason = async () => {
      try {
        const response = await axios(`${API_URL}/product/get/season`);
        setseasons(response.data);
      } catch (error) {
        console.error("Error fetching season:", error);
      }
    };

    fetchSeason();
    const fetchCode = async () => {
      try {
        const response = await axios(`${API_URL}/discountcode/getcodes`);
        console.log("code", response.data);
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    fetchCode();
  }, [lang]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [banners]);

  const handleNext = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrevious = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };
  const toggleCanvas = () => {
    setCanvasOpen(!isCanvasOpen);
  };
  useEffect(() => {
    setThemeMode(darkMode);

    // Function to handle scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    };

    // Adding the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, [darkMode, setThemeMode]);

  const { isEmpty, totalItems } = useCart();
  const [productType, setProductType] = useState("");
  useEffect(() => {
    const getproductForSearch = async () => {
      try {
        const res = await axios.get(`${API_URL}/product/get/allproducts`);
        setAllproductData(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getproductForSearch();
  }, [openSearch]);
  const handleType = (
    title,
    subtype = "",
    season = "",
    allproductData = ""
  ) => {
    const productInfo = {
      mainType: title,
      productType: subtype,
      season: season,
      allproductData: allproductData,
    };

    localStorage.setItem("productInfo", JSON.stringify(productInfo)); // Store the object as a JSON string
    setProductType(subtype); // Update state
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filter the products based on the search query
    const filteredResults = allproductData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  return (
    <>
      {/* Banner section for the discount code */}
      <div className="banner-fixed ">
        <button onClick={handlePrevious} aria-label="Previous banner">
          <IoIosArrowBack style={{ color: "white", fontSize: "15px" }} />
        </button>

        <span
          style={{
            maxWidth: "25rem", // Optional: Limit width for larger screens
            width: "100%", // Ensure it scales with screen width
            textAlign: "center", // Center text within the banner
            display: "inline-block", // Allow the span to sit alongside the buttons
          }}
        >
          {banners.length > 0 && currentBannerIndex < banners.length
            ? `USE CODE "${banners[currentBannerIndex].code}" FOR ${banners[currentBannerIndex].discount_percentage}%`
            : "Loading..."}
        </span>

        <button onClick={handleNext} aria-label="Next banner">
          <IoIosArrowForward style={{ color: "white", fontSize: "15px" }} />
        </button>
      </div>

      {/* Top section with logo and icons */}
      <Navbar
        variant={darkMode ? "dark" : "light"}
        className={`navbar-fixed ${
          darkMode ? "bg-light-black border-bottom" : "bg-light border-bottom"
        }`}
      >
        <Container className="d-flex align-items-center justify-content-between">
          {/* Left Icons: Sign in */}
          <Nav className="d-flex align-items-center">
            <div
              className={`dropdown-wrapper ${
                theme ? "bg-light-black text-light " : "bg-light text-black"
              } `}
            >
              <select
                className="form-select small-select"
                onChange={handleSelection}
              >
                <option value="en">En</option>
                <option value="ar">Ar</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <Nav.Link
              className={`${
                darkMode ? "text-dark-primary" : "text-light-primary"
              } d-none d-md-block`} // Hide on small screens, show on medium and up
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <BiSun size="1.2rem" /> : <BiMoon size="1.2rem" />}
            </Nav.Link>
          </Nav>

          {/* Centered Logo */}
          <Link to="/">
            <Navbar.Brand className="mx-auto">
              {/* <img src="/images/logo2.png" alt="Logo" style={{ maxHeight: '50px' }} /> */}

              <Image
                src={Logo}
                style={{ maxHeight: "70px", margin: "10px" }}
                thumbnail
                fluid
                roundedCircle
                className="p-0"
              />
            </Navbar.Brand>
          </Link>

          {/* Right Icons: Dark mode toggle,Translate and Cart*/}
          {/* Right Icons: Dark mode toggle, Cart, Account */}
          <Nav className="d-flex align-items-center">
            <div
              className={`nav-link ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              <div className="d-flex align-items-center">
                {openSearch && (
                  <nav className="navbar">
                    <div className="container-fluid ">
                      <form className="d-flex" role="search">
                        <input
                          className="form-control me-2  search-bar"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          onChange={handleInputChange}
                        />
                        {searchQuery && (
                          <ul className="search_dropdown">
                            {searchResults.length > 0 ? (
                              searchResults.map((product) => (
                                <li
                                  key={product.id}
                                  onClick={() => {
                                    navigate(
                                      `${lang}/product-details/${product.id}`
                                    );
                                    setOpenSearch(false);
                                    window.scrollTo(0, 0);
                                  }}
                                >
                                  <img
                                    src={`${API_URL}/${product.first_image}`}
                                    alt={product.name}
                                    height={"50"}
                                    width={"50"}
                                  />
                                  {product.name}
                                </li>
                              ))
                            ) : (
                              <li>No products found.</li>
                            )}
                          </ul>
                        )}
                      </form>
                    </div>
                  </nav>
                )}
                <IoIosSearch
                  size="1.3rem"
                  onClick={() => setOpenSearch(!openSearch)}
                  className="ms-2  search-bar" // Adds a margin to separate icon from input
                />
              </div>
            </div>
            {user ? (
              <Link
                to={`/${lang}/my-account`}
                className={`nav-link ${
                  darkMode ? "text-dark-primary" : "text-light-primary"
                } d-none d-md-block`}
              >
                <VscAccount size="1.2rem" />
              </Link>
            ) : (
              <Link
                to={`/${lang}/sign-in`}
                className={`nav-link ${
                  darkMode ? "text-dark-primary" : "text-light-primary"
                } d-none d-md-block`}
              >
                <VscAccount size="1.2rem" />
              </Link>
            )}

            <Link
              style={{ cursor: "pointer" }}
              to={`${lang}/cart`}
              className={`m-2 ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              } `}
            >
              <GrCart size="1.2rem" />
              {!isEmpty && (
                <span style={{ position: "relative" }}>
                  {!user ? totalItems : cart.length}
                </span>
              )}
            </Link>
          </Nav>
        </Container>
      </Navbar>
      {/* Bottom section with navigation links */}
      {[false, "sm", "md", "lg", "xl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          variant={darkMode ? "dark" : "light"}
        >
          <Container
            fluid
            className={`navbar2-fixed ${
              theme ? "bg-light-black border-bottom" : "bg-light border-bottom"
            }`}
          >
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className={`${
                darkMode ? "bg-dark text-light" : "bg-light text-dark"
              }`}
            >
              {" "}
              <Offcanvas.Header
                closeButton
                className={`${
                  darkMode ? "text-dark-primary" : "text-light-primary"
                }`}
              >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hadiyyeh
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <Nav.Link href="/">
                    {lang === "ar" ? "الرئيسية" : "HOME"}
                  </Nav.Link>

                  <NavDropdown
                    title={lang === "ar" ? "العطور" : "FRAGRANCES"}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Fragrance", "1")}
                    >
                      {lang === "ar" ? "رجال" : "FOR HIM"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Fragrance", "2")}
                    >
                      {lang === "ar" ? "نساء" : "FOR HER"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Fragrance", "3")}
                    >
                      {lang === "ar" ? "للجنسين" : "UNISEX"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Fragrance")}
                    >
                      {lang === "ar" ? "جميع العطور" : " ALL FRAGRANCES   "}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={lang === "ar" ? "الساعات" : "WATCHES"}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Watches", "1")}
                    >
                      {lang === "ar" ? "رجال" : "FOR HIM"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Watches", "2")}
                    >
                      {lang === "ar" ? "نساء" : "FOR HER"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Watches", "3")}
                    >
                      {lang === "ar" ? "للجنسين" : "UNISEX"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Watch")} // Call with just main type for "ALL WATCHES"
                    >
                      {lang === "ar" ? "جميع العطور" : "    ALL WATCHES    "}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={lang === "ar" ? "الحقائب" : "BAGS & POUCHES"}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Bags", "1")}
                    >
                      LAPTOP BAGS{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Bags", "2")}
                    >
                      TRAVEL POUCHES{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Bags", "3")}
                    >
                      BACKPACK
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/${lang}/allproducts`}
                      onClick={() => handleType("Bag")}
                    >
                      ALL BAGS & POUCHES
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={lang === "ar" ? "تسوق حسب الماركة" : "SHOP BY BRAND"}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {brands.map((brand) => (
                      <NavDropdown.Item
                        key={brand._id}
                        href={`/${lang}/productbybrand/${brand.brand_name}`}
                      >
                        {brand.brand_name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown
                    title={lang === "ar" ? "تسوق حسب الموسم" : "SHOP BY SEASON"}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {seasons.map((season, index) => (
                      <NavDropdown.Item
                        key={index}
                        onClick={() => handleType("", "", `${season.season}`)}
                        href={`/${lang}/allproducts`}

                        // href={`/${lang}/`}
                      >
                        {season.season}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>

                  <Nav.Link href={`/${lang}/gift`}>
                    {lang === "ar" ? "شحن المحفظة" : "WALLET"}
                  </Nav.Link>
                  <Nav.Link
                    href={`/${lang}/allproducts`}
                    onClick={() => handleType("", "", "", "allproducts")}
                  >
                    {lang === "ar" ? "جميع المنتجات" : "ALL PRODUCTS"}
                  </Nav.Link>
                </Nav>

                {/* Social media icons (hidden on large screens, visible on small screens) */}
                {/* Social media icons (for dark mode) */}
                <div className="social-icons-toggle">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    } mx-2`}
                  >
                    <FaFacebook size="1.3rem" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    } mx-2`}
                  >
                    <BsInstagram size="1.3rem" />
                  </a>
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    } mx-2`}
                  >
                    <RiTiktokFill size="1.3rem" />
                  </a>
                </div>
                {/* Icons toggle (dark mode, account, translate) centered like social-icons-toggle */}
                <div className="social-icons-toggle d-flex d-md-none justify-content-center">
                  <Nav.Link
                    className={
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    }
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? (
                      <BiSun size="1.2rem" />
                    ) : (
                      <BiMoon size="1.2rem" />
                    )}
                  </Nav.Link>

                  <Link
                    to={`${lang}/my-account`}
                    className={`nav-link ${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    } mx-2`}
                  >
                    <VscAccount size="1.2rem" />
                  </Link>
                  <form className="d-flex offcanvas-search-bar" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </form>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      {/* Include the RightCart component */}
      <RightCart
        cartItems={cartItems}
        isCanvasOpen={isCanvasOpen}
        toggleCanvas={toggleCanvas}
      />
    </>
  );
};

export default Header;
