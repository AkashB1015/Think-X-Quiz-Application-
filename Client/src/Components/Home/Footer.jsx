import React from "react";
import { Link } from "react-router-dom";


export function Footer() {
    return (
        <footer
            className="simple-footer bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="footer-content row text-center text-md-start align-items-center">
            
                    <div className="col-md-4 mb-4 mb-md-0">
                          <i className="bi text-danger me-5 fs-3 fw-bold"> ThinkX</i>
                        <p className="mb-1">support@ThinkX.com | +91 98111 11111</p>
                        <p className="mb-0">CDAC - Mumbai ,Maharashtra, India</p>
                    </div>

                    <div className="col-md-4 mb-4 mb-md-0 text-center">

                        <h5 className="fw-bold text-light mb-2">Developed By</h5>
                        <p className="mb-1">Team: 56 (CDAC-Mumbai)</p>
                        <p className="mb-0">Akash Bhadane | Sumit Mote | Deepa Jadhav</p>

                    </div>

                    <div className="col-md-4 text-md-end">
                        <h6 className="fw-bold text-light mb-2">Quick Links</h6>
                        <div className="d-flex justify-content-center justify-content-md-end flex-wrap">

                            <Link to="/"  className="text-white text-decoration-none me-3 mb-2"> Home </Link>
                            <Link to="/about"  className="text-white text-decoration-none me-3 mb-2"> About </Link>
                            <Link to="/services" className="text-white text-decoration-none me-3 mb-2" > Services </Link>
                            <Link to="/contact" className="text-white text-decoration-none mb-2" >Contact</Link>

                        </div>
                    </div>
                </div>

                <div className="footer-bottom text-center mt-3 border-top pt-3">

                    <p className="mb-0 small text-secondary">
                        &copy; 2025 - Think-X. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
