import { useContext } from 'react';
import { Context } from '../context/AuthContext';


export function useAuth() {
    return useContext(Context);
}