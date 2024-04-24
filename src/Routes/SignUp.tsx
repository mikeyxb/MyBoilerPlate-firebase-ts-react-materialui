import React, { useEffect, useState } from 'react'
import { auth } from '../config/Firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import Button from '@mui/material/Button'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
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
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const Logout = async () => {
        try {
            await signOut(auth)
            console.log('Logged out')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col w-full h-screen justify-center align-middle items-center'>
            <div className='flex flex-col justify-center w-fit align-middle items-center gap-2 border rounded-2xl shadow-2xl p-20'>
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
                    <Button variant='contained' sx={{ width: '35ch' }} onClick={login}>Sign Up</Button>
                </div>
                {currentUser && (
                    <Button variant='contained' sx={{ width: '35ch' }} onClick={Logout}>Logout</Button>
                )}
                <Link to="/">Back</Link>
            </div>
        </div>
    )
}

export default SignUp