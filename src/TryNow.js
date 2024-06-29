import React from "react";
import wallet from './wallet.png';
import { useState } from 'react';
import { ethers } from 'ethers';
import LoginDialog from './LoginDialog';
import ABIDTSLA from './ABIDTSLA.json';// Add this line
import { useEffect } from 'react';

const Page = () => {
    const dtslaAddress = "0x6087c28F5a39A3718113C03BD1d9e19D96453b24";
    const [address, setAddress] = useState("Connect Wallet");
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const [inputValue2, setInputValue2] = useState(0);
    const [portfolioBalance, setPortfolioBalance] = useState(null);
    const [dtslaBalance, setDtslaBalance] = useState(null);
    const [tslaPrice, setTslaPrice] = useState(null);
    const [add, setAdd] = useState(0);


    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    };

    const toggleOpen = () => {
        setOpen(true);
    }


    const [mintAmount, setMintAmount] = useState(0);

    const handleMintAmountChange = (event) => {
        setMintAmount(event.target.value);
    }


    async function handleClick() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAdd(accounts[0]);
                const firstFourWords = accounts[0].slice(0, 4)
                const lastFourWords = accounts[0].slice(15, 19)
                setAddress(`${firstFourWords} ... ${lastFourWords}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    }


    async function redeem() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                await handleClick();
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(dtslaAddress, ABIDTSLA, signer);
            const bigNumber = ethers.BigNumber.from(inputValue2);
            console.log(bigNumber);
            const tx = await contract.redeem(bigNumber);
            await tx.wait();
        } catch (error) {
            console.error(error);
        }
    }

    async function withdraw() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                await handleClick();
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(dtslaAddress, ABIDTSLA, signer);
            const tx = await contract.withdraw();
            await tx.wait();
        } catch (error) {
            console.error(error);
        }
    }

    async function getPortfolioBalance() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                await handleClick();
            }
            const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/IwxDLF249rDhcON6Sr0UkwWdeDzV7A0a');
            const contract = new ethers.Contract(dtslaAddress, ABIDTSLA, provider);
            const balance = await contract.getPortfolioBalance()

            setPortfolioBalance(balance.toString() / 10 ** 18);
        } catch (error) {
            console.error(error);
        }
    }

    async function getDtslaBalance() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                await handleClick();
            }
            const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/IwxDLF249rDhcON6Sr0UkwWdeDzV7A0a');
            const contract = new ethers.Contract(dtslaAddress, ABIDTSLA, provider);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const balance = await contract.balanceOf(accounts[0])
            setDtslaBalance(balance.toString());
        } catch (error) {
            console.error(error);
        }
    }

    async function getTslaPrice() {
        try {
            const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/IwxDLF249rDhcON6Sr0UkwWdeDzV7A0a');
            const contract = new ethers.Contract(dtslaAddress, ABIDTSLA, provider);
            const balance = await contract.getTslaPrice()
            setTslaPrice(balance.toString() / 1e18);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const portfolioInterval = setInterval(() => {
            getPortfolioBalance();
        }, 10000);


        const dtslaInterval = setInterval(() => {
            getDtslaBalance();
        }, 10000);


        const tslaPriceInterval = setInterval(() => {
            getTslaPrice();
        }, 10000);


        return () => {
            clearInterval(portfolioInterval);
            clearInterval(dtslaInterval);
            clearInterval(tslaPriceInterval);
        };
    }, []);



    return (
        <>
            <header style={{ width: '100%', height: '25%', backgroundColor: '#000000', padding: '10px 7px' }}>
                <button className="headerButton" onClick={() => handleClick()} style={{ backgroundColor: 'transparent', borderColor: 'white', fontSize: '20px', borderRadius: '3px', fontFamily: 'Cabinet Grotesk', color: '#FFFFFF', padding: '10px 12px', backgroundColor: '#4628FF', alignItems: 'top', display: 'flex', marginLeft: '85%' }}>
                    <img src={wallet} alt="wallet" style={{ height: '28px', width: '28px', paddingRight: '4px' }} /> <span>{address}</span></button>
            </header>
            <main style={{ backgroundColor: '#0f0f12' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', paddingLeft: '20px' }}>
                    <div style={{ width: '50%' }}>
                        <label htmlFor="inputBox" style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', paddingRight: '30px' }}>Enter the DTSLA amount you want to mint</label>
                        <input style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', padding: '5px 10px', borderRadius: '5px', border: 'none', backgroundColor: '#000000' }}
                            id="inputBox"
                            type="text"
                            value={mintAmount}
                            onChange={handleMintAmountChange}
                        />
                        <div style={{ display: 'block', justifyContent: 'center', marginTop: '20px' }}>
                            <label htmlFor="inputBox" style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', paddingRight: '41px' }}>Enter USDC you would like to pay( 1%  Fee)</label>
                            <input style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', padding: '5px 10px', borderRadius: '5px', border: 'none', backgroundColor: '#000000' }}
                                id="inputBox"
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}

                            />
                        </div>
                        <button className="headerButton" onClick={toggleOpen} style={{ backgroundColor: '#4628FF', color: '#FFFFFF', padding: '10px 25px', marginLeft: '10px', borderRadius: '5px', border: 'none', marginTop: '20px', fontFamily: 'Clash Display', fontSize: '20px' }}>Mint</button>
                        <div style={{ display: 'block', justifyContent: 'center', marginTop: '20px' }}>
                            <label htmlFor="inputBox" style={{ fontFamily: 'Clash Display', fontSize: '20px', marginTop: '120px', color: '#FFFFFF', paddingRight: '41px' }}>Earned great Profits let's redeem them !</label>
                            <input style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', padding: '5px 10px', borderRadius: '5px', border: 'none', backgroundColor: '#000000' }}
                                id="inputBox"
                                type="text"
                                value={inputValue2}
                                onChange={handleInputChange2}
                            />
                        </div>
                        <button className="headerButton" onClick={redeem} style={{ backgroundColor: '#4628FF', color: '#FFFFFF', padding: '10px 25px', marginLeft: '10px', borderRadius: '5px', border: 'none', marginTop: '20px', fontFamily: 'Clash Display', fontSize: '20px' }}>Redeem</button>
                        <div style={{ backgroundColor: '#FF474C', display: 'block', width: '30%', borderRadius: '5px', padding: '10px 7px', marginTop: '20px', marginLeft: '10px' }}>
                            <span style={{ fontSize: '15px', color: '#FF0000', fontFamily: 'cursive' }}>Please check stock market timings before send redeem transaction. If stock market is closed transaction will complete but this dosen't mean that transaction has passed.If stock market is closed you will get back your burnt DTSLA.We are not responsible for your gas lost</span>
                        </div>
                        <label htmlFor="inputBox" style={{ fontFamily: 'Clash Display', fontSize: '20px', marginTop: '70px', color: '#FFFFFF', paddingRight: '41px', display: 'block' }}>Click to get your USDC balance to withdraw!</label>
                        <button className="headerButton" onClick={withdraw} style={{ backgroundColor: '#4628FF', color: '#FFFFFF', padding: '10px 25px', marginLeft: '10px', marginBottom: '70px', borderRadius: '5px', border: 'none', marginTop: '20px', fontFamily: 'Clash Display', fontSize: '20px' }}>Withdraw</button>

                    </div>
                    <div style={{ marginTop: '20px', width: '50%' }}>
                        <span style={{ fontFamily: 'Clash Display', fontSize: '15px', color: '#FFFFFF', paddingRight: '30px' }}>DTSLA is a real world asset pegged to the price of Tesla stock. It is minted by depositing USDC and can be redeemed for USDC. The minting and redemption process is governed by a smart contract on the Ethereum blockchain. The minting process involves depositing USDC , checking if our centralized server has atleast 2x TSLA stocks than the total stocks minted. The redemption process involves burning DTSLA tokens , selling TSLA stocks from our centralized account and receiving USDC in return. The smart contract ensures that the price of DTSLA is pegged to the price of Tesla stock by adjusting the minting and redemption rates based on the price of Tesla stock. The smart contract also enforces a 1% fee on minting and redemption transactions to cover the costs of maintaining the peg and operating the smart contract.</span>
                        <div style={{ justifyContent: 'center', marginTop: '60px', borderWidth: '3px', borderRadius: '5px', borderColor: '#FFFFFF' }}>
                            <p style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', paddingRight: '30px' }}>Portfolio Balance: ${portfolioBalance} </p>
                            <p style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', paddingRight: '30px' }}>DTSLA Balance(user): {dtslaBalance} </p>
                            <p style={{ fontFamily: 'Clash Display', fontSize: '20px', color: '#FFFFFF', paddingRight: '30px' }}>TSLA Price: ${tslaPrice}</p>
                        </div>
                    </div>
                </div>
            </main>
            <LoginDialog open={open} setOpen={setOpen} mintAmount={mintAmount} inputValue={inputValue} />
        </>
    )

}

export default Page;