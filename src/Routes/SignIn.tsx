import React, { useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../config/Firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import Button from '@mui/material/Button'
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/AuthContext'
import googleLogo from '../assets/googleLogo.svg'
import NavBar from '../components/NavBar'


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const { snackbarOpen, setSnackbarOpen } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, googleProvider)
            console.log(user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }

    const handleClose = (reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };



    return (
        <div>
            <NavBar />
            <div className='flex flex-col w-full h-screen justify-center align-middle items-center'>
                <div className='flex flex-col justify-center w-fit align-middle items-center gap-2 border rounded-2xl shadow-xl shadow-black p-20 bg-white'>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" size='small'>Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            onChange={(e) => setEmail(e.target.value)}
                            size='small'
                            label="Email"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" size='small'>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            size='small'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}

                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <div>
                        <Button variant='contained' sx={{ width: '35ch' }} onClick={login}>Login</Button>

                        <div className='flex justify-center'>Or</div>

                        <Button variant='outlined' sx={{ width: '35ch' }} onClick={signInWithGoogle}>
                            <img src={googleLogo} alt="Google logo" className='w-[35px]' />
                            Sign in with Google
                        </Button>
                    </div>
                    <div>Not got an account <Link to="/signup">Sign Up</Link></div>
                    <Snackbar open={snackbarOpen} autoHideDuration={9000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Logged out successfully!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default SignIn