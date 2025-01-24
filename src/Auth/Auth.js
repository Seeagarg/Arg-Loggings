import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const Auth = ({children}) => {

    const user = localStorage.getItem('user');

    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
       
    }, [user])
  return (
    <>
    {children}
    </>
  );
}

export default Auth;
