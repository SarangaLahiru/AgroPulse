import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./ContactForm.css";
import { useStateContext } from "../../context/contextProvider";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { setTranslations, translations } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact", {
        name,
        email,
        message,
      });
      Swal.fire({
        title: "Message Sent!",
        text: "Thank you for your message! We will get back to you soon.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#014802",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#014802",
      });
    }
  };
  return (
    <div className="contact  container" data-aos="fade-up">
      <div className="row">
        <div className="contact__box">
          <h2 className="hire__text">{translations.support_p}</h2>
          <h1 className="hire__text">{translations.contact}</h1>
          <p className="hire__text">
          {translations.contact_Form_p}
          </p>
        </div>

        <div className="input__box">
          <form onSubmit={handleSubmit}>
            <div className="contact_sub_text ">{translations.name} *</div>
            <input
              type="text"
              className="contact"
              placeholder={translations.input_name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="contact_sub_text">{translations.email} *</div>
            <input
              type="email"
              className="contact"
              placeholder={translations.input_email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="contact_sub_text">{translations.message} *</div>
            <textarea
              placeholder={translations.input_message}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <div className="send__button">
              <button className="send__pointer btn " type="submit">
              {translations.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
