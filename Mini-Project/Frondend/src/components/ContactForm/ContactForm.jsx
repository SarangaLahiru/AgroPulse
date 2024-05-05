import React from "react";
import "./ContactForm.css";

function ContactForm() {
  return (
    <div className=" contact  container ">
      <div className="row">
        <div className="col__2">
          <div className=" contact__box">
            <div className="contact__meta">
              <h2 className="hire__text">Support</h2>
              <h1 className="hire__text">Contact</h1>
              <p className="hire__text">
                If you have any questions, problems, or feedback get in touch
                here:
              </p>
            </div>

            <div className="input__box">
              <div className="contact_sub_text">Name *</div>
              <input
                type="text"
                className="contact"
                placeholder="Enter Your Name"

              />
              <div className="contact_sub_text">Email *</div>
              <input
                type="text"
                className="contact"
                placeholder="Enter Your Email"
              />
              <div className="contact_sub_text">Message *</div>
              <textarea
                name="message"
                id="message"
                placeholder="Enter Your Massage..."
              ></textarea>
              <div className="send__button">
                <button className="send__pointer btn">send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
