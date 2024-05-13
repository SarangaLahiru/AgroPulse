import React, { useEffect } from 'react';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { FiChevronRight } from 'react-icons/fi';
import { MdEmail } from "react-icons/md";
import './footer.css';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {

    //scroll animation...
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className='footer'>
            <div className="footerLinks flex" data-aos='fade-up' data-aos-duration='4000'>
                {/*Group One - Our Services*/}
                <div className="linkGroup" data-aos='fade-up' data-aos-duration='000'>
                    <span className="groupTitle">
                        Our Services
                    </span>

                    <li className="footerList flex">
                        <FiChevronRight className='icon' />
                        Pest Detecion
                    </li>

                    <li className="footerList flex">
                        <FiChevronRight className='icon' />
                        Solutions
                    </li>

                    <li className="footerList flex">
                        <FiChevronRight className='icon' />
                        Community
                    </li>
                </div>

                {/*Group Two - Contact Info*/}
                <div className="linkGroup" data-aos='fade-up' data-aos-duration='4000'>
                    <span className="groupTitle">
                        Contact Info
                    </span>

                    <li className="footerList flex">
                        <FaLocationDot className='cont-icon' />
                        No 25, Foster Lane, Colombo 10
                    </li>

                    <li className="footerList flex">
                        <FaPhone className='cont-icon' />
                        +94 11 267 43 43 <br></br>
                        +94 11 217 24 34
                    </li>

                    <li className="footerList flex">
                        <MdEmail className='cont-icon' />
                        pest.management@agro.hayleys.com
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
