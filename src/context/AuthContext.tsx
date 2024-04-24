// Import necessary functions and types from React and Firebase
import { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/Firebase';

// Define the shape of the context
interface ContextProps {
    user: User | null; // Current user
    setUser: Dispatch<SetStateAction<User | null>>; // Function to set the current user
    snackbarOpen: boolean; // State of the snackbar
    setSnackbarOpen: Dispatch<SetStateAction<boolean>>; // Function to set the state of the snackbar
    isAdmin: boolean; // State of admin status
}

// Create the context with the defined shape
export const Context = createContext<ContextProps | undefined>(undefined);

// Define the context provider component
export const AuthContext: React.FC = ({ children }) => {
    // Get the auth instance
    const auth = getAuth();

    // Define state variables
    const [user, setUser] = useState<User | null>(null); // Current user
    const [loading, setLoading] = useState(true); // Loading state
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
    const [isAdmin, setIsAdmin] = useState(false); // Admin state

    // Run this effect when the component mounts
    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Set loading to false
            setLoading(false);

            // If there's a current user, set the user state
            if (currentUser) {
                setUser(currentUser);
                // Add your logic to check if the user is an admin
                // This is just an example, replace it with your own logic
                setUser(currentUser);
                const checkAdmin = async () => {
                    const adminsRef = collection(db, 'admins');
                    const q = query(adminsRef, where('uuid', '==', currentUser.uid));
                    const querySnapshot = await getDocs(q);
                    setIsAdmin(!querySnapshot.empty);
                };
                checkAdmin();
            } else {
                // If there's no current user, set the user state to null
                setUser(null);
                setIsAdmin(false);
            }
        });

        // Unsubscribe from auth state changes when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

    // Define the values to provide through the context
    const values = {
        user,
        setUser,
        snackbarOpen,
        setSnackbarOpen,
        isAdmin,
    };

    // Render the context provider with the defined values
    return (
        <Context.Provider value={values}>
            {/* Render children when not loading */}
            {!loading && children}
        </Context.Provider>
    );
};