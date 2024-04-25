import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import '../App.css';
import { Rating, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/Firebase';
import { useAuth } from '../components/auth';



const reviewsCollectionRef = collection(db, 'reviews');

function ReviewsPage() {
    type AuthContextType = {
        isAdmin: boolean;
        // Include other properties that useAuth returns
    };
    const [user] = useAuthState(auth);
    const { isAdmin } = useAuth() as AuthContextType;
    const [reviews, setReviews] = useState<{ id: string, guest: string, review: string, posted: string, stars: number, approved: boolean }[]>([]);


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
                setReviews(sortedData as { id: string, guest: string, review: string, posted: string, stars: number, approved: boolean }[]);
            } catch (error) {
                console.log('Error getting documents: ', error)
            }
        }
        getReviews();
    }, []);

    const deleteReview = async (id: string) => {
        // Implement deleteReview function
        await deleteDoc(doc(db, 'reviews', id));
        // Update the reviews state directly
        setReviews(reviews.filter(review => review.id !== id));
    };

    const approveReview = async (id: string) => {
        // Implement approveReview function
        await updateDoc(doc(db, 'reviews', id), {
            approved: true
        });
        // Update the reviews state directly
        setReviews(reviews.map(review => review.id === id ? { ...review, approved: true } : review));
    };

    return (
        <div className='flex flex-row bg-white m-10 justify-center rounded-2xl p-6 shadow-xl shadow-black gap-5 flex-wrap '>
            {reviews.map((review) => (
                // Only display the review if it's approved or the user is an admin
                (review.approved || isAdmin) && (
                    <fieldset key={review.id} className='flex  flex-col justify-start items-center text-left w-fit max-w-[45%] min-w-[40%] p-10 border-green-600 border rounded-md'>
                        <legend className='flex items-center justify-center m-auto text-xl font-RobotoBold text-center w-3/4'>{review.guest}</legend>
                        <Typography component="legend">Rating</Typography>
                        <Rating name="read-only" value={review.stars || 0} readOnly />
                        <p>{review.stars}</p>
                        <p>{review.review}</p>
                        <div className='flex w-full justify-end text-[10px] text-right'>{review.posted}</div>
                        <div className='flex gap-5 m-5 justify-evenly items-start'>
                            {isAdmin && (
                                <div className='flex flex-col gap-4'>
                                    <Button variant="outlined" color='error' onClick={() => deleteReview(review.id)}>Delete</Button>{''}
                                    {!review.approved ? (
                                        <Button variant="contained" endIcon={<ModeEditIcon />} onClick={() => approveReview(review.id)}>Approve</Button>
                                    ) : ("")}
                                </div>
                            )}
                        </div>
                    </fieldset>
                )
            ))}
        </div>
    );
}

export default ReviewsPage;