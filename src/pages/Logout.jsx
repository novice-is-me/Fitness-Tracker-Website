import React from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App';

const Logout = () => {
    const { setToken } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
    }, [navigate, setToken]);

    return null; 
};

export default Logout;
