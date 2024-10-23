import React from 'react';
import '../Css/brands.css'; // For custom styling
import { Image } from 'react-bootstrap'; // Import Image component from react-bootstrap
import Brand1 from '../images/ARMAF_Logo.webp';
import Brand2 from '../images/Afnan_Logo.webp';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { IoIosArrowRoundForward } from "react-icons/io";

const Brands = () => {
  const [theme] = useThemeHook();
  return (
    <div className={theme ? 'bg-light-black text-light container-Brands' : 'bg-light text-black container-Brands'}>
         <h3 className={theme? 'text-light Title-Brands m-5': 'text-black Title-Brands m-5'}>BRANDS YOU LOVE!</h3>
      
      <div className="row mt-4">
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 1" className="brand-image img-fluid" />
          <a href="https://brand1.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 1 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand2} alt="Brand 2" className="brand-image img-fluid" />
          <a href="https://brand2.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 2 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 3" className="brand-image img-fluid" />
          <a href="https://brand3.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 3 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand2} alt="Brand 4" className="brand-image img-fluid" />
          <a href="https://brand4.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 4 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 5" className="brand-image img-fluid" />
          <a href="https://brand5.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 5 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 6" className="brand-image img-fluid" />
          <a href="https://brand6.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 6 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 1" className="brand-image img-fluid" />
          <a href="https://brand1.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 1 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand2} alt="Brand 2" className="brand-image img-fluid" />
          <a href="https://brand2.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 2 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 3" className="brand-image img-fluid" />
          <a href="https://brand3.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 3 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand2} alt="Brand 4" className="brand-image img-fluid" />
          <a href="https://brand4.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 4 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 5" className="brand-image img-fluid" />
          <a href="https://brand5.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 5 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
        <div className="col-6 col-sm-4 col-md-2 text-center brand-image-container">
          <Image src={Brand1} alt="Brand 6" className="brand-image img-fluid" />
          <a href="https://brand6.com" target="_blank"className={theme ? 'm-3 link-Brands' : 'text-black m-3 link-Brands'} rel="noopener noreferrer">
            Brand 6 <IoIosArrowRoundForward size="1.5rem" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Brands;