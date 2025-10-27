import React from 'react';
import './Footer.css';

function Footer() 
{
    return (
        <footer className="footer">
            
            <div className="footer-container">
                <div className="footer-links">
                    <a href="/about">About</a>
                    <a href="/help">Help</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                    <a href="/contact">Contact</a>
                </div>

                <div className="footer-copyright">
                    <p>© 2025 InstaGram. All rights reserved.</p>
                </div>
                
            </div>
            
        </footer>
    );
}

export default Footer;
