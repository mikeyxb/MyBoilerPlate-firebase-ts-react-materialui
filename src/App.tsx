import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import { db } from './config/Firebase'
import { getDocs, collection } from 'firebase/firestore'
import ReviewsPage from './components/ReviewsPage';
import Home from './components/Home';

const reviewsCollectionRef = collection(db, 'reviews');

function App() {
  const [reviews, setReviews] = useState<{ id: string, guest: string, review: string }[]>([]);



  // getDocs gets all the documents from the reviews collection
  // getDoc would get a single document

  useEffect(() => {
    // this is an async function that will get the reviews from Firestore we use useEffect to run this function when the
    // component mounts, we do this by passing an empty array as the second argument to useEffect.
    const getReviews = async () => {
      // READ the reviews collection from Firestore

      //SET the reviews list to the reviews state, data gets all the documents from the reviews collection, we then map over
      // the data in the filteredData variable and return an object with the id and the data of each document and the data is
      // then set to the reviews state. we set the type of filteredData to { id: string, guest: string, review: string }[] to
      // make sure that the data we are getting is of the correct type.

      // the try block is used to catch any errors that may occur when getting the reviews from Firestore, if there is an error we log the error to the console.

      // we could use a toast to display the error to the user, but for now we will just log the error to the console. and
      // lastly we call the getReviews function to get the reviews from Firestore. we call the function inside the useEffect
      // hook so that it runs when the component mounts.
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

    // in this section we render the Auth component
    // the reviews are mapped over and displayed in the right side of the screen, this will be moved to a separate component
    // later on and authentification will be added to the reviews section so that only authenticated users can see the reviews.
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ReviewsPage" element={<ReviewsPage reviews={reviews} />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
