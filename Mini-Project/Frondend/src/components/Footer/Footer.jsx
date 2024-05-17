import React from 'react';
import { useEffect } from 'react';
import './footer.css';
import { FiChevronRight } from 'react-icons/fi';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import logo from '../../../public/images/logo2.png';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  //scroll animation...
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

    return (
        <section className='footer'>
            <div className="footerLinks flex">
                {/*Group One - Our Services*/}
                <div className="linkGroup" data-aos='fade-up' data-aos-duration='4000'>
                    <span className="groupTitle">
                        Our Services
                    </span>

          <li className='footerList flex'>
            <FiChevronRight className='icon' />
            Pest Detecion
          </li>

          <li className='footerList flex'>
            <FiChevronRight className='icon' />
            Solutions
          </li>

          <li className='footerList flex'>
            <FiChevronRight className='icon' />
            Community
          </li>

          
        </div>

        

        

        {/* Group Two - Contact Info */}
        <div className='linkGroup contactInfo'data-aos='fade-up' data-aos-duration='4000'>
          <div className='groupTitle'>Contact Info</div>

          <li className='footerList'>
            <FaLocationDot className='cont-icon' />
            <span>No 25, Foster Lane, Colombo 10</span>
          </li>

          <li className='footerList'>
            <FaPhone className='cont-icon' />
            <div className='phoneNumber'>+94 11 267 43 43  /  +94 11 217 24 34</div>
          </li>

          <li className='footerList'>
            <MdEmail className='cont-icon' />
            <span>pest.management@agro.com</span>
          </li>
        </div>
      </div>

            <div className="bottomSection">
                <h3>AgroPluse © 2024 All Right Reserved</h3>
            </div>

        </section>
    );
}

export default Footer;