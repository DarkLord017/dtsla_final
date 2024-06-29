import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Box, Dialog, Typography } from '@mui/material';
import { ethers } from 'ethers';
import ABIUSDC from './ABIUSDC.json';
import ABIDTSLA from './ABIDTSLA.json';


const LoginDialog = ({ open, setOpen, mintAmount, inputValue }) => {
    const usdcAddress = "0xDa317C1d3E835dD5F1BE459006471aCAA1289068";
    const dtslaAddress = "0x6087c28F5a39A3718113C03BD1d9e19D96453b24";
    const [progress, setProgress] = useState(0);
    const [variant, setVariant] = useState("success");
    const [dialogText, setDialogText] = useState("Please approve the following transactions!");
    const [alert, setAlert] = useState(false);


    const handleClose = () => {
        setOpen(false);
        setProgress(0);
        setVariant("success");
        setDialogText("Please approve the following transactions!");
        setAlert(false);

    };

    const handleSendTransaction = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(usdcAddress, ABIUSDC, signer);

        try {
            console.log(inputValue);
            const bigNumber = ethers.BigNumber.from(inputValue);
            console.log(bigNumber);

            setProgress(25); // Update progress to 25%

            const tx = await contract.approve(usdcAddress, bigNumber);
            await tx.wait();

            setProgress(50); // Update progress to 50%

            // After USDC approval, you can mint DTSLA tokens here if needed
            const dtslaContract = new ethers.Contract(dtslaAddress, ABIDTSLA, signer);
            const bigNumberdtsla = ethers.BigNumber.from(mintAmount);
            const mintTx = await dtslaContract.mint(bigNumberdtsla, inputValue);
            const hash = mintTx.hash
            setDialogText(`Transaction hash : ${hash}`)
            setAlert(true)// Assuming mint function and parameters
            await mintTx.wait();

            setProgress(100); // Update progress to 100%

            console.log('Transaction confirmed!');
        } catch (error) {
            console.error('Error sending transaction:', error);
            setProgress(100); // Update progress to 100%
            setVariant("danger"); // Set progress bar variant to danger
        }
    };

    useEffect(() => {
        if (open) {
            handleSendTransaction();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Box sx={{ padding: '20px', backgroundColor: '#1c1c1e', color: '#ffffff' }}>
                <Typography variant="h6" sx={{ fontFamily: 'cursive', marginBottom: '20px' }}>
                    {dialogText}
                </Typography>
                {
                    alert ? <Typography variant="h6" sx={{ fontFamily: 'cursive', marginBottom: '10px', color: '#FF0000' }}>This does not mean you have minted DTSLA you will have to wait 1-2 minutes </Typography> : null
                }
                <ProgressBar variant={variant} now={progress} />
            </Box>
        </Dialog>
    );
};

export default LoginDialog;
