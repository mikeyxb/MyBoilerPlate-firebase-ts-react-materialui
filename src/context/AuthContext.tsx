import { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface ContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    snackbarOpen: boolean;
    setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

export const AuthContext: React.FC = ({ children }) => {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const values = {
        user,
        setUser,
        snackbarOpen,
        setSnackbarOpen,
    };

    return (
        <Context.Provider value={values}>
            {!loading && children}
        </Context.Provider>
    );
};
