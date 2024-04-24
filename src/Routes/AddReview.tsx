import React from 'react'
import NavBar from '../components/NavBar'
import { Button, FormControl, InputLabel, OutlinedInput, Rating, TextField, Typography } from '@mui/material'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/Firebase'
import { Snackbar, Alert } from '@mui/material';

const AddReview = () => {
    const [name, setName] = React.useState('')
    const [review, setReview] = React.useState('')
    const [stars, setStars] = React.useState<number | null>(0)
    const [open, setOpen] = React.useState(false);

    const submitReview = async () => {
        // this will submit the review to firestore
        try {
            await addDoc(collection(db, 'reviews'), {
                guest: name,
                review: review,
                posted: serverTimestamp(),
                stars: stars,
                approved: false
            })
            console.log(name, review)
            handleClick();
            setName('');
            setReview('');
            setStars(0);
        } catch (error) {
            console.error('Error adding document: ', error)

        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <>
            <NavBar />
            <div className='flex flex-col w-full h-screen justify-center align-middle items-center'>
                <div className='flex flex-col justify-center w-fit align-middle items-center gap-2 border rounded-2xl shadow-xl shadow-black p-20 bg-white'>
                    <Typography component="legend">Rate our hotel</Typography>
                    <Rating
                        name="simple-controlled"
                        value={stars}
                        onChange={(event, newValue) => {
                            setStars(newValue);
                        }}
                    />
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-name" size='small'>Guest</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            onChange={(e) => setName(e.target.value)}
                            size='small'
                            label="Name"
                            value={name}
                        />
                    </FormControl>
                    <TextField
                        sx={{ m: 1, width: '35ch' }}
                        id="outlined-multiline-review"
                        label="Review"
                        multiline
                        maxRows={8}
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                    />
                    <Button variant='contained' sx={{ width: '35ch' }} onClick={submitReview}>Submit Review</Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Review submitted successfully!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </>
    )
}

export default AddReview