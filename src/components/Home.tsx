import React from 'react'
import Auth from './auth'

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen w-full'>
            <div className='flex flex-row justify-evenly border w-3/4 shadow-2xl rounded-lg overflow-hidden'>
                <div className='flex p-20 justify-center align-middle w-1/2'>
                    <Auth />
                </div>
                <div className='flex w-1/2 text-white justify-center items-center'
                    style={{
                        backgroundImage: `url('https://i.ibb.co/X8dkrNL/THEME-HOTEL-SIGN-FIVE-STARS-FACADE-BUILDING-Getty-Images-1320779330-3.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                </div>
            </div>
        </div>
    )
}

export default Home