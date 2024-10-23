import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { FaBalanceScale } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import axios from "axios";
function Gift() {
  const [theme] = useThemeHook();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);
  const handleChargeBalance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/wallet/chargebalance`, {
        userId: userId,
        amount: amount,
        paymentMethod: paymentMethod,
      });
      // Check for successful response
      if (response.status === 200) {
        setErrorMessage(response.data.message);
        // navigate(`/dashboard/${lang}/`);
      } else {
        setErrorMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "An unexpected error occurred."
        );
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };
  const handleConfirmPayment = async () => {
    try {
        const response = await axios.post(`${API_URL}/wallet/confirmpayment`, { userId }); // Send userId as an object

        if (response.status === 200) {
            setErrorMessage(response.data.message);
        } else {
            setErrorMessage(response.data.message || "An error occurred.");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage(error.response?.data?.message || "An unexpected error occurred.");
    }
};

  return (
    <Container>
      {!userId ? <p className="mt-5 text-center"> Please Login to use this service</p> :  <Row className="justify-content-center mt-5">
        <Col
          xs={11}
          sm={10}
          md={8}
          lg={4}
          className={`p-4 rounded ${
            theme ? "text-light bg-dark" : "text-black bg-light"
          }`}
        >
          <h1
            className={`text-center border-bottom pb-3 ${
              theme ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            {lang === "ar" ? "شحن المحفظة" : "Charge Wallet"}{" "}
          </h1>
          <Form onSubmit={handleChargeBalance}>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <FaBalanceScale size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="amount"
                type="number"
                placeholder={lang === "ar" ? "الرصيد" : "Amount"}
                required
                onChange={(e) => setAmount(e.target.value)}
              />{" "}
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <MdOutlinePayment size="1.8rem" />
              </InputGroup.Text>
              <Form.Select onChange={(e) => setPaymentMethod(e.target.value)}>
                <option>
                  {lang === "ar" ? "طريقة الدفع" : "Payment Method"}
                </option>
                <option value="cliq">Cliq</option>
                <option value="credit card">Credit Card</option>
              </Form.Select>
            </InputGroup>
            {errorMessage && (
              <div
                className="error-message"
                style={{
                  color: "blue",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "2vh",
                }}
              >
                {errorMessage}
              </div>
            )}{" "}
            {/* Display error message */}
            <Button
              type="submit"
              className={`${
                theme ? "bg-dark-primary text-black" : "bg-light-primary"
              } m-auto d-block`}
              //   disabled={loading}
              style={{ border: 0 }}
            >
              {/* {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp;Loading...
              </>
            ) : ( */}
              {lang === "ar" ? "اشحن" : "Submit"}
              {/* )} */}
            </Button>
          </Form>
        </Col>
      </Row>}
    
      <Button
        type="button"
        className={`${
          theme ? "bg-dark-primary text-black" : "bg-light-primary"
        } m-auto d-block`}
        onClick={handleConfirmPayment}
        style={{ border: 0 }}
      >
        {/* {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp;Loading...
              </>
            ) : ( */}
        {lang === "ar" ? "تأكيد الدفع" : "Confrim Payment"}
        {/* )} */}
      </Button>
    </Container>
  );
}

export default Gift;
// import React, { useState, useEffect } from "react";
// import { Image, Modal, Button, Row, Col } from "react-bootstrap";
// import { useThemeHook } from "../GlobalComponents/ThemeProvider";
// import slider1 from "../images/gift.webp"; // Fallback image
// import { useCart } from "react-use-cart";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { IoMdAdd } from "react-icons/io";
// import { FiMinus } from "react-icons/fi";
// import "../Css/gift.css";
// function Gift() {
//   const [theme] = useThemeHook();
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [activeButton, setActiveButton] = useState(null); // Track the active button
//   const [currentImage, setCurrentImage] = useState(
//     selectedProduct?.image || slider1
//   );
//   const { addItem } = useCart();
//   const API_URL = process.env.REACT_APP_API_URL;
//   const [isGift, setIsGift] = useState(false); // Manage visibility of the gift form
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const lang = location.pathname.split("/")[1] || "en";
//   const [gifts, setgifts] = useState([]);
//   const [selectedGiftCard, setSelectedGiftCard] = useState(null);
//   const [selectedCardID, setSelectedCardID] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   const toggleOffcanvas = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleButtonClick = (value, image) => {
//     setActiveButton(value);
//     setCurrentImage(image); // Change image based on button click
//   };

//   const handleGiftChange = () => {
//     setIsGift(!isGift); // Toggle gift form visibility
//   };
//   const handleCloseModal = () => setShowModal(false);
//   const handleQuantityChange = (action) => {
//     if (action === "increase") {
//       setQuantity(quantity + 1);
//     } else if (action === "decrease" && quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
//   useEffect(() => {
//     const getGifts = async () => {
//       const res = await axios.get(`${API_URL}/giftcard`);
//       setgifts(res.data);
//       console.log(res.data);
//     };
//     getGifts();
//   }, []);
//   const handleShowModal = (id) => {
//     const card = gifts.find((gift) => gift.id === id);
//     setSelectedGiftCard(card);
//     setSelectedCardID(card.id)
//     setShowModal(true);
//   };
//   const handleGiftDetails = () => {
//     navigate(`/${lang}/giftDetails/${selectedCardID}`);
//   };
//   return (
//     <section
//       className={
//         theme
//           ? "bg-light-black text-light margin_section full-screen-slider"
//           : "bg-light text-black margin_section full-screen-slider"
//       }
//       data-aos="fade-up"
//     >
//       <div className="container text-center container-all mt-5">
//         {/* Backdrop for Offcanvas */}
//         {isOpen && (
//           <div
//             className="offcanvas-backdrop fade show"
//             onClick={toggleOffcanvas}
//           ></div>
//         )}

//         <div className="row  justify-content-center">
//           {gifts.map((product) => (
//             <div className="col-lg-3 col-md-4 col-sm-12 mb-5" key={product.id}>
//               <div className="image-container">
//                 <Image
//                   src={`${API_URL}/${product.img}`}
//                   className="img-fluid img-all"
//                   alt="Product Image"
//                 />
//               </div>
//               <h6 className={`mt-1 ${theme ? "text-light" : "text-black"}`}>
//                 {product.title}
//               </h6>
//               <p className={theme ? "text-light" : "text-black"}>
//                 {product.amount} JD
//               </p>

//               <Button
//                 type="submit"
//                 className={`${
//                   theme
//                     ? "bg-dark-primary text-black"
//                     : "bg-light-primary text-light"
//                 } px-4 py-2 w-100 mt-3 `}
//                 onClick={() => handleShowModal(product.id)}
//                 style={{ border: 0 }}
//               >
//                 {" "}
//                 CHOOSE OPTION
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Modal */}
//       <Modal
//         show={showModal}
//         onHide={handleCloseModal}
//         centered
//         className={`custom-modal ${theme ? " text-light" : "text-dark "}`}
//       >
//         <Modal.Header
//           closeButton
//           className={
//             theme ? " text-light bg-light-black" : "text-dark bg-light"
//           }
//         >
//           <Modal.Title>Hadiyyeh</Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           className={theme ? "text-light bg-light-black" : "text-dark bg-light"}
//         >
//           {selectedGiftCard && (
//             <Row>
//               <Col xs={12} md={6}>
//                 <div className="image-container">
//                   <Image
//                     src={`${API_URL}/${selectedGiftCard.img}`}
//                     className="img-fluid img-all"
//                     alt="Product Image"
//                   />
//                 </div>
//               </Col>

//               <Col xs={12} md={6}>
//                 <h2>{selectedGiftCard.title}</h2>

//                 <div className={`${theme ? "text-dark-primary" : ""}`}>
//                   Price: {selectedGiftCard.amount}
//                 </div>
//                 <div className={`${theme ? "text-dark-primary" : ""}`}>
//                   Taxes included.
//                 </div>
//                 <div className={`mt-2 ${theme ? "text-dark-primary" : ""}`}>
//                   Denominations
//                 </div>

//                 <div className="d-flex justify-content-between flex-wrap mt-3">
//                   <Button
//                     type="submit"
//                     onClick={() => handleButtonClick(10, slider1)} // Set active to 10 and change image
//                     className={`${theme ? "text-black" : ""} px-4 py-2 mt-1 ${
//                       activeButton === 10
//                         ? "bg-light-primary text-white"
//                         : "bg-dark-primary text-black"
//                     }`}
//                     style={{ border: 0 }}
//                   >
//                     JOD {selectedGiftCard.amount}
//                   </Button>
//                 </div>

//                 <div className={`mt-2 ${theme ? "text-dark-primary" : ""}`}>
//                   Quantity
//                 </div>
//                 {/* Quantity Control */}
//                 <div className="d-flex mt-3">
//                   <button
//                     className="btn btn-outline-secondary"
//                     onClick={() => handleQuantityChange("decrease")}
//                     // disabled={item.quantity <= 1} // Disable if quantity is 1 or less
//                   >
//                     <FiMinus size="1.4rem" />
//                   </button>
//                   <span className="m-2">{quantity}</span>{" "}
//                   {/* Display current quantity */}
//                   <button
//                     className="btn btn-outline-secondary"
//                     onClick={() => handleQuantityChange("increase")}
//                   >
//                     <IoMdAdd size="1.4rem" />
//                   </button>
//                   {/* <span><FaRegTrashCan size="1rem"/></span> */}
//                 </div>
//                 {/* Gift Checkbox */}
//                 <div className="form-check mt-3">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="flexCheckGift"
//                     checked={isGift}
//                     onChange={handleGiftChange} // Show/hide gift form
//                   />
//                   <label className="form-check-label" htmlFor="flexCheckGift">
//                     I want to send this as a gift
//                   </label>
//                 </div>

//                 {/* Conditional Rendering of Gift Form */}
//                 {isGift && (
//                   <div className="mt-3">
//                     {/* Recipient Email */}
//                     <div className="form-group mt-3">
//                       <input
//                         type="email"
//                         id="recipientEmail"
//                         className={
//                           theme
//                             ? "form-control"
//                             : "form-control text-dark bg-light"
//                         }
//                         placeholder="Enter recipient's email"
//                       />
//                     </div>
//                     {/* Recipient Name */}
//                     <div className="form-group mt-3">
//                       <input
//                         type="text"
//                         id="recipientName"
//                         className={
//                           theme
//                             ? "form-control"
//                             : "form-control text-dark bg-light"
//                         }
//                         placeholder="Enter recipient's name"
//                       />
//                     </div>

//                     {/* Gift Message */}
//                     <div className="form-group mt-3">
//                       <textarea
//                         id="giftMessage"
//                         className={
//                           theme
//                             ? "form-control"
//                             : "form-control text-dark bg-light"
//                         }
//                         rows="3"
//                         placeholder="Enter a gift message"
//                       />
//                     </div>

//                     {/* Delivery Date */}
//                     <div className="form-group mt-3">
//                       <input
//                         type="date"
//                         id="deliveryDate"
//                         className={
//                           theme
//                             ? "form-control"
//                             : "form-control text-dark bg-light"
//                         }
//                         placeholder="Select a delivery date"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </Col>
//             </Row>
//           )}
//         </Modal.Body>

//         <Modal.Footer
//           className={
//             theme ? " text-light bg-light-black" : "text-dark bg-light"
//           }
//         >
//           <Button
//             type="button"
//             onClick={handleGiftDetails}
//             className={`${
//               theme ? "bg-dark-primary text-black" : "bg-light-primary"
//             } px-4 py-2 `}
//             style={{ border: 0 }}
//           >
//             View full details
//           </Button>
//           <Button
//             onClick={() => {
//               // Ensure you pass the necessary properties to addItem
//               addItem({
//                 id: selectedGiftCard.id,
//                 title: selectedGiftCard.title,
//                 price: selectedGiftCard.amount,
//                 quantity: quantity,
//                 first_image: `${API_URL}/${selectedGiftCard.img}`,
//               });
//                   }}
//             type="button"
//             className={`${
//               theme ? "bg-dark-primary text-black" : "bg-light-primary"
//             } px-4 py-2 `}
//             style={{ border: 0 }}
//           >
//             Add to Cart
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </section>
//   );
// }

// export default Gift;
