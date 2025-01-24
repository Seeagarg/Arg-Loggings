import React,{useState} from 'react'
import classes from './Home.module.css'
import Layout from '../Layouts/Layout'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { InputTextarea } from "primereact/inputtextarea";
import QueryForm from '../Components/QueryForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const [sidebarHide,setSidebarHide] = useState(false)
  const [text,setText] = useState('');

  const sidebarHandler = () => {
    
    setSidebarHide(!sidebarHide);
  };


  return (
    <>
    <div className={`${classes.main} ${sidebarHide && classes.short}`}>
     <SideBar sidebarHide={sidebarHide} sidebarHandler={sidebarHandler}/>
     <div className={classes.container}>
     <Header/>
     <div className={classes.sub_container}>
     <QueryForm/> 
     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam iste asperiores reprehenderit error ipsa eius eos accusamus tempora natus, laborum suscipit ea corrupti ullam animi dolores! Natus modi expedita, voluptates est fugit magnam cupiditate optio, repellendus aliquam amet distinctio obcaecati illo sint quos labore, nulla soluta corrupti ullam alias laudantium?
     </div>
     </div>
     <ToastContainer/>
     </div>
    </>
  )
}

export default Home
