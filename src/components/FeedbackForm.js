import React, { useState } from "react";
import "../Css/feedback.css";
import { Button } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
function FeedbackForm() {
    const [theme] = useThemeHook();
    const API_URL = process.env.REACT_APP_API_URL;
    const storedUser = JSON.parse(localStorage.getItem("account"));
    const { id } = useParams();
const [message,setMessage]=useState("")
const handleFeedback=async(e)=>{
    e.preventDefault()
    try {
        const response = await axios.post(`${API_URL}/feedback/add`,{user_id:storedUser.id,product_id:id,message})
        setMessage("")
    } catch (error) {
        console.error("Error sending feedback:", error);
        
    }
 
}
  return (
    <div>
      <main className="form-signin">
        <h1 className="title_feedback">FeedBack</h1>

        <form className="form_feedback" onSubmit={handleFeedback}>
          <div className="form-floating">
            <textarea
              className="form-control feedback_textarea"
              id="floatingPassword"
              placeholder="Message"
              required
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            ></textarea>
            <label for="floatingPassword">Message</label>
          </div>

          {/* <button className="w-100 btn btn-lg" type="submit">Sign in</button> */}
          <Button
            type="submit"
            className={`${
              theme ? "bg-dark-primary text-black" : "bg-light-primary"
            } m-auto d-block px-5`}
            //   disabled={loading}
            style={{ border: 0 }}
          >
            Send
          </Button>
        </form>
      </main>
    </div>
  );
}

export default FeedbackForm;
