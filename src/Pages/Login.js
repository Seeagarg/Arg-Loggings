import React,{useState} from 'react'
import classes from './Login.module.css'
import loginAnimation from '../Animations/Login.json' 
import Lottie from 'lottie-react'
import 'primeicons/primeicons.css';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

    const [show,setShow] = useState(false);
    const navigate = useNavigate();

    const [details,setDetails] = useState({username:'',password:''})

    const handleShowPassword=()=>{
        setShow(!show)
    }

    const handleChange=(e)=>{
        const {name,value} = e.target;

        setDetails((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(details)
        if(!details.username || !details.password || details.username === '' || details.password == ' '){
            toast.warn("Please fill in the required fields")
        }
        else if(details.username == 'admin' || details.password == 'admin@123'){
            localStorage.setItem('user',details.username)
            navigate('/')
        }
        else{
            toast.error("Entered Fields are Incorrect!!")

        }
        
    }

  return (
    <>
    <div className={classes.container}>
    
    <div className={classes.sub_container}>
    <div>
    <Lottie
        animationData={loginAnimation}
        className={classes.animation}
    />
    </div>
    <div className={classes.side_container}>
   <p className={classes.title}> Welcome to ARG_Loggings</p>
   <form type="submit" className={classes.form} onSubmit={handleSubmit}>
  <div className={classes.input_div}>
   <p className={classes.label}>
   <i className="pi pi-user"></i>
   Enter UserName:</p>
   <div className={classes.input}>
   <input type="text" name="username"  value={details.username} onChange={handleChange}/> 
   </div>
   </div>
   {/* <br /> */}
   <div className={classes.input_div}>

   <p className={classes.label}>
   <i className="pi pi-lock"></i>
   Enter Password:</p>
   <div className={classes.input}>
    <input type={show ? 'text' : `password`} name="password" value={details.password} onChange={handleChange}/><i className={`pi ${show ? 'pi-eye-slash' : 'pi-eye'}`} onClick={handleShowPassword} style={{cursor:'pointer'}}></i>
   </div>
   </div>
   {/* <br /> */}
    <button className={classes.btn}>
        Login
    </button>
   </form>
    </div>
    </div>
    <ToastContainer/>
    </div>
    </>
  )
}

export default Login
