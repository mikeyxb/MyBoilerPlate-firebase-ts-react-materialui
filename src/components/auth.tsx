import React, { useState } from 'react'
import { auth, googleProvider } from '../config/Firebase'
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>

            <button onClick={signInWithGoogle}>Sign in with Google</button>

            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Auth