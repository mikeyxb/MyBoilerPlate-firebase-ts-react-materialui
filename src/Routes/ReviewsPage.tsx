
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/Firebase';
import '../App.css';
import { Rating, Typography } from '@mui/material';

const reviewsCollectionRef = collection(db, 'reviews');

function ReviewsPage() {

    const [reviews, setReviews] = useState<{ id: string, guest: string, review: string, posted: string, stars: number }[]>([]);


    useEffect(() => {
        const getReviews = async () => {
            try {
                const data = await getDocs(reviewsCollectionRef)
                const filteredData = data.docs.map((doc) => {
                    const { posted, ...otherDocData } = doc.data(); // Exclude 'posted' from docData
                    const postedDate = posted.toDate(); // Convert Firestore timestamp to JavaScript Date
                    const formattedDate = `${postedDate.getDate()}/${postedDate.getMonth() + 1}/${postedDate.getFullYear()}`; // Format date as DD/MM/YYYY
                    const formattedTime = `${postedDate.getHours()}:${postedDate.getMinutes()}`; // Format time as HH:MM:SS
                    return { id: doc.id, posted: `${formattedDate} ${formattedTime}`, ...otherDocData };
                });
                console.log({ filteredData });
                const sortedData = filteredData.sort((a, b) => b.posted.localeCompare(a.posted)); // Sort reviews by date
                setReviews(sortedData as { id: string, guest: string, review: string, posted: string, stars: number }[]);
            } catch (error) {
                console.log('Error getting documents: ', error)
            }
        }
        getReviews();
    }, []);
    return (
        <div className='flex flex-row bg-white m-10 justify-evenly rounded-2xl p-6 shadow-xl shadow-black gap-5 flex-wrap '>
            {reviews.map((reviews) => (
                <fieldset key={reviews.id} className='flex  flex-col justify-evenly items-center text-left w-fit max-w-[25%] p-10 border-green-600 border rounded-md'>
                    <legend className='flex items-center justify-center m-auto text-xl font-RobotoBold text-center w-3/4'>{reviews.guest}</legend>
                    <Typography component="legend">Rating</Typography>
                    <Rating name="read-only" value={reviews.stars || 0} readOnly />
                    <p>{reviews.stars}</p>
                    <p>{reviews.review}</p>
                    <div className='flex w-full justify-end text-[10px] text-right'>{reviews.posted}</div>
                    <div className='flex gap-5 m-5 justify-between items-start'>

                        <Button variant="outlined" color='error' >Delete</Button>{''}

                        <Button variant="contained" endIcon={<ModeEditIcon />}>Edit</Button>
                    </div>
                </fieldset>
            ))}
        </div>
    );
}

export default ReviewsPage;