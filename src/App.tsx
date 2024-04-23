import { useEffect, useState } from 'react';
import './App.css'
import Auth from './components/auth'
import { db } from './config/Firebase'
import { getDocs, collection } from 'firebase/firestore'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function App() {
  const [reviews, setReviews] = useState<{ id: string, guest: string, review: string }[]>([]);

  const reviewsCollectionRef = collection(db, 'reviews');

  // getDocs gets all the documents from the reviews collection
  // getDoc would get a single document

  useEffect(() => {
    // this is an async function that will get the reviews from Firestore we use useEffect to run this function when the component mounts, we do this by passing an empty array as the second argument to useEffect.
    const getReviews = async () => {
      // READ the reviews collection from Firestore

      //SET the reviews list to the reviews state
      try {
        const data = await getDocs(reviewsCollectionRef)
        const filteredData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        console.log({ filteredData })
        setReviews(filteredData as { id: string, guest: string, review: string }[]) // Update the type of filteredData
      } catch (error) {
        console.log('Error getting documents: ', error)
      }
    };
    // we call the getReviews function here
    getReviews();
  }, []);

  return (
    // this is a fragment
    <>
      <div className='flex flex-row justify-evenly border w-3/4 shadow-2xl rounded-lg overflow-hidden'>
        <div className='flex p-20 justify-center align-middle w-1/2'>
        <Auth />
        </div>
        <div className='flex w-1/2 bg-slate-800 text-white justify-center items-center'>
          {reviews.map((review) => (
            <div key={review.id}>
              <h2>{review.guest}</h2>
              <p>{review.review}</p>

              <Button variant="outlined" color='error' >Delete</Button>{''}

              <Button variant="contained" endIcon={<ModeEditIcon />}>Edit</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
