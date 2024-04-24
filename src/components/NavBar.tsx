import { useContext } from 'react';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, currentUser } from '../config/Firebase';
import { Context } from '../context/AuthContext';
import Logo from '../assets/logo.svg'
import { Link, NavLink, Navigate } from 'react-router-dom';
import '../App.css';


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
        <nav className='flex flex-row gap-10 w-full align-middle justify-between items-center pl-10 pr-10 pt-4 pb-4 shadow-black shadow-2xl bg-white'>
            <div id='navBar' className='flex flex-row gap-10 align-middle justify-between items-center '>
                <img src={Logo} alt="description_of_image" width={100} />
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'underline' : ''}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/add"
                    className={({ isActive }) => isActive ? 'underline' : ''}
                >
                    Add Review
                </NavLink>
            </div>
            <div>
                {auth.currentUser ? (
                    <Button onClick={Logout}>Logout</Button>
                ) : (
                    <Button component={Link} to="/signin">Sign In</Button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;