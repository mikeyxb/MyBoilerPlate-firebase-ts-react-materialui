
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/Firebase';

const reviewsCollectionRef = collection(db, 'reviews');

function ReviewsPage() {

        const [reviews, setReviews] = useState<{ id: string, guest: string, review: string }[]>([]);

        useEffect(() => {
            const getReviews = async () => {
                try {
                    const data = await getDocs(reviewsCollectionRef)
                    const filteredData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                    console.log({ filteredData })
                    setReviews(filteredData as { id: string, guest: string, review: string }[])
                } catch (error) {
                    console.log('Error getting documents: ', error)
                }
            }
            getReviews();
        }, []);
    return (
        <div>
            {reviews.map((review) => (
                <div key={review.id}>
                    <h2>{review.guest}</h2>
                    <p>{review.review}</p>

                    <Button variant="outlined" color='error' >Delete</Button>{''}

                    <Button variant="contained" endIcon={<ModeEditIcon />}>Edit</Button>
                </div>
            ))}
        </div>
    );
}

export default ReviewsPage;