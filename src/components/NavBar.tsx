import  { useContext } from 'react';
import {  Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { Context } from '../context/AuthContext';


const NavBar = () => {
    const { setSnackbarOpen } = useContext(Context);



    const Logout = async () => {
        try {
            await signOut(auth);
            setSnackbarOpen(true); // Show the Snackbar when the user logs out
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className='flex flex-row gap-10 w-full align-middle justify-between pl-10 pr-10 pt-4 pb-4 border border-black'>
            <div className='flex flex-row gap-10'>
                <img src="path_to_your_image" alt="description_of_image" />
                <div>Home</div>
                <div>Reviews</div>
            </div>
            <div>
                <Button onClick={Logout}>Logout</Button>
            </div>
        </nav>
    );
};

export default NavBar;