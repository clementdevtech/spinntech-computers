// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);

    const loginUser = async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(login(data));
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logoutUser = () => dispatch(logout());

    return { user, token, loginUser, logoutUser };
};

export default useAuth;
