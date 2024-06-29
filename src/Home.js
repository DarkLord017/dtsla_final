import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import backgroundImage from './background.svg';
import './App.css'; // Make sure to create this CSS file
import logo from './logo.png';
import bg from './background.png';
import arrow from './arrow.png';
import ether from './ether.png';
import { ReactTyped } from "react-typed";
import betaV from './betaV.png';
import instagram from './instagram.png';
import github from './github.png';
import linkedin from './linkedin.png';
import x from './twitter.png';

const App = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);


    const handleButtonClick = () => {
        navigate('/TryNow');
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className="background"
                style={{
                    backgroundColor: '#0f0f12',
                    alignItems: 'center',
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                <header className={`header ${isScrolled ? 'scrolled' : ''}`} style={{ height: '12%', display: 'flex' }}>
                    <div style={{
                        height: '12vh', // Adjust the height as needed
                        display: 'flex',
                        alignItems: 'center',
                        // Center the content horizontally
                        padding: '0 20px', // Optional: add padding if needed
                        boxSizing: 'border-box',
                    }}>
                        <img src={logo} alt="logo" style={{ height: '100%', objectFit: 'contain' }} />
                        <h1 style={{ color: '#FFFFFF', fontSize: '20px' }}>DTSLA</h1>
                    </div>
                    <div style={{ display: 'flex', color: '#FFFFFF', alignItems: 'center', paddingLeft: '30vw' }}>
                        <h1 className="headerButtons">HOME</h1>
                        <h1 className="headerButtons">ABOUT</h1>
                        <h1 className="headerButtons">DOCS</h1>
                    </div>
                    <div style={{ display: 'flex', color: '#FFFFFF', alignItems: 'center', paddingLeft: '35vw' }}>
                        <button className='headerButton' onClick={() => handleButtonClick()}>TRY NOW!</button>
                    </div>
                </header>
                <main style={{ display: 'flex', height: '100%', width: '100%' }}>
                    <div>
                        <h4 style={{ color: '#4628FF', paddingLeft: '39px', marginTop: '97px', fontSize: '32px', marginBottom: '5px', fontFamily: 'Clash Display' }}>RWA-PEGGED TSLA COIN </h4>
                        <h1 style={{
                            fontSize: '100px', color: '#FFFFFF', paddingLeft: '39px', paddingTop: '0px', marginTop: '0px', marginBottom: '126px', height: '400px', width: '800px', fontFamily: 'Clash Display', whiteSpace: 'pre-line', WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}>BUY AND TRADE TOKENS FROM ANYWHERE <span style={{ color: '#4628FF' }}>.</span><br />

                        </h1>
                        <div style={{ display: 'flex', paddingLeft: '25px', paddingTop: '0px', marginTop: '0px', fontFamily: 'Clash Display', alignContent: 'center' }}>
                            <button className='headerButton' onClick={() => handleButtonClick()}>TRY NOW!</button>
                            <button style={{ paddingTop: '3px', marginLeft: '17px', backgroundColor: 'transparent', color: '#FFFFFF', fontFamily: 'Clash Display', border: 'none', fontSize: '18px', cursor: 'pointer' }}>Stock Market Timings</button>
                            <img src={arrow} alt="arrow" style={{ height: '35px', objectFit: 'contain', paddingLeft: '10px', paddingTop: '3px' }} />
                        </div>
                    </div>
                    <div className="rotating-sphere">
                        <img src={bg} alt="animation" className="sphere-image" />
                    </div>
                    <div style={{
                        height: '100vh', width: '100vw', backgroundColor: '#0f0f12'
                    }}>{/* Just to create scrollable content */}

                    </div>
                </main >
            </div >
            <div>
                <div style={{
                    height: '100vh', width: '100vw', backgroundColor: '#0f0f12'
                }}>
                    <h1 style={{ color: '#FFFFFF', fontSize: '100px', paddingLeft: '39px', paddingTop: '190px', marginTop: '0px', marginBottom: '126px', fontFamily: 'Clash Display', whiteSpace: 'pre-line', WebkitBoxOrient: 'vertical' }}>
                        AVAILABLE ON
                    </h1>
                    <button className='headerButton' style={{ marginLeft: '350px', fontSize: '100px', padding: '40px 30px' }}>
                        <img src={ether} alt="ether" style={{ height: '80px', objectFit: 'contain', paddingRight: '10px', alignItems: 'center' }} />
                        ETHERUM SEPOLIA
                    </button>
                    <img src={betaV} alt="betaV" style={{ objectFit: 'contain', paddingLeft: '88%', paddingRight: '0px', alignItems: 'top' }} />
                </div>
            </div>
            <footer style={{ backgroundColor: '#000000', display: 'flex', alignItems: 'center' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100px', paddingTop: '40px', paddingBottom: '0px' }}>
                        <img src={logo} alt="logo" style={{ height: '100%', objectFit: 'contain' }} />
                        <h1 style={{ fontSize: '20px', fontFamily: 'Clash Display', color: '#FFFFFF' }}>DTSLA.SOL</h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                        <img src={instagram} alt="socials" style={{ marginRight: '15px', paddingLeft: '30px', cursor: 'pointer' }} />
                        <img src={github} alt="socials" style={{ marginRight: '15px', cursor: 'pointer' }} />
                        <img src={linkedin} alt="socials" style={{ marginRight: '15px', cursor: 'pointer' }} />
                        <img src={x} alt="socials" style={{ marginRight: '15px', cursor: 'pointer' }} />
                    </div>

                </div>
                <div>
                    <h1 style={{ whiteSpace: 'nowrap', justifyItems: 'center', paddingLeft: '25vw', width: '70vw', color: '#FFFFFF', fontFamily: 'cursive' }}>MADE WITH&nbsp;
                        <ReactTyped strings={["CHAINLINK", "ALPACA", "ETHERS"]} typeSpeed={200}
                            loop
                            backSpeed={120}
                            cursorChar="|"
                            showCursor={true}

                        />
                    </h1>
                </div>
                <div style={{ justifyItems: 'end' }}>
                    <h1 className="FooterPages" >HOME</h1>
                    <h1 className="FooterPages ">ABOUT</h1>
                    <h1 className="FooterPages">DOCS</h1>
                    <h1 className="FooterPages">MINT DTSLA</h1>
                </div>
            </footer>
        </>
    )
}

export default App;