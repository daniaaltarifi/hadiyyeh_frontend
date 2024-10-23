import React, { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ThemeContext } from '../GlobalComponents/ThemeProvider';
import { BiSun, BiMoon, BiCart } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';
import { Link } from "@reach/router";
import { useCart } from "react-use-cart";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
    const { theme, setThemeMode } = useContext(ThemeContext); 
    const [darkMode, setDarkMode] = useState(theme);
    const [showBanner, setShowBanner] = useState(true); // State for the banner visibility

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
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up the event listener
        };
    }, [darkMode]);

    const {
        isEmpty,
        totalItems,
    } = useCart();

    return (
        <>
         {/* Banner section for the discount code */}
{showBanner && (
    <div style={{ 
        backgroundColor: '#121212', 
        color: '#ffffff', 
        lineHeight: '1.4',  // Adjust line-height to scale with screen size
        padding: '1% 5%',  // Adjust padding to scale with screen width
        textAlign: 'center', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 200,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        boxSizing: 'border-box',  // Ensure padding is included in width
         
    }}>
        <span style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
          
            maxWidth: '1000px',  // Optional: Limit width for larger screens
            width: '100%',       // Ensure it scales with screen width
            textAlign: 'center' , // Center text within the banner
        }}>
            USE CODE "10OFF" FOR 10% OFF ON ORDERS WORTH 50 JDS & ABOVE
        </span>
    </div>
)}

            {/* Top section with logo and icons */}
            <Navbar variant={darkMode ? 'dark' : 'light'} className={darkMode ? 'bg-light-black border-bottom' : 'bg-light border-bottom'} style={{ width: '100%', position: 'fixed', zIndex: 100, top: showBanner ? '60px' : '0px' }}>
                <Container className="d-flex justify-content-between align-items-center">
                    <Link to="/">
                        <Navbar.Brand className={darkMode ? 'text-dark-primary' : 'text-light-primary'}>
                            <b>Simple-ecart</b>
                        </Navbar.Brand>
                    </Link>
                    <Nav className="d-flex align-items-center">
                        {/* <Link to="sign-in" className={`nav-link ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
                            Sign in
                        </Link> */}
                        <Nav.Link className={darkMode ? 'text-dark-primary' : 'text-light-primary'} onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <BiSun size="1.2rem" /> : <BiMoon size="1.2rem" />}
                        </Nav.Link>
                        <Link to="/cart" className={`${darkMode ? 'text-dark-primary' : 'text-light-primary'} d-flex align-items-center`}>
                            <BiCart size="1.2rem" />
                            {!isEmpty && <span style={{ position: 'relative', left: '-21px', top: '-18px' }}>{totalItems}</span>}
                            <span style={{ marginLeft: !isEmpty ? '-13px' : 0 }}></span>
                        </Link>
                        <Link to="my-account" className={`nav-link ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
                            <VscAccount size="1.2rem" />
                        </Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Bottom section with navigation links */}
            {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
                <Navbar key={expand} expand={expand} variant={darkMode ? 'dark' : 'light'} className={darkMode ? 'bg-light-black border-bottom' : 'bg-light border-bottom'} style={{ width: '100%', position: 'fixed', zIndex: 100, top: showBanner ? '110px' : '60px' }}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-center flex-grow-1 pe-3">
                                    <Nav.Link href="#action1">Home</Nav.Link>
                                    <Nav.Link href="#action2">Link</Nav.Link>
                                    <NavDropdown title="Dropdown" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                
            ))}
            {/* Spacer div to add space below the fixed navbar */}
<div style={{ height: '80px' }}></div> {/* Adjust height as needed */}
        </>
    );
};

export default Header;
