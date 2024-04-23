import React, { useState } from 'react'
import { auth, googleProvider } from '../config/Firebase'
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import Button from '@mui/material/Button'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, googleProvider)
            console.log(user)
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
        <div className='flex flex-col gap-2'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" size='small'>Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    onChange={(e) => setEmail(e.target.value)}
                    size='small'
                    label="Email"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
            <Button onClick={login}>Login</Button>

            <Button onClick={signInWithGoogle}>Sign in with Google</Button>

            <Button variant='contained' onClick={Logout}>Logout</Button>
        </div>
    )
}

export default Auth