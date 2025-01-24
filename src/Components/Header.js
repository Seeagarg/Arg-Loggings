import React,{useState} from 'react'
import classes from './Header.module.css'
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from 'react-router-dom'
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from "@mui/material/TextField";

// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

const Header = () => {


    const [showDropdown,setShowDropdown] = useState(false);
    const [dates, setDates] = useState([new Date(), new Date()]);
    const [time, setTime] = useState(dayjs());
    const [toTime,setToTime] = useState(dayjs());
    const[service,setService] = useState('');


    const userName = localStorage.getItem('user');
    const navigate = useNavigate();

    const showMobileMenuHandler=()=>{

    }


    const dropdownHandler = () => {
      setShowDropdown(!showDropdown);
    };

    const handleLogout=()=>{
      localStorage.removeItem('user')
      navigate('/login')
    }


  return (
    <div>
       <header className={classes.header}>
        <div className={classes.header_sub_container}>
          <div className={classes.menu}>
            <i
              className={`pi pi-align-justify ${classes.menu_icon}`}
              onClick={showMobileMenuHandler}
            ></i>
          </div>
          <button className={classes.client_name}>ARG Loggings</button>
         
          {/* <button className={classes.service_name}>service</button> */}
        </div>

<div className={classes.right}>



        <div className="flex flex-col justify-center items-end">
                <span className="text-md">
                  Date Range
                </span>
                <div className="flex border  rounded-md items-center p-[3px] pb-[2px]" style={{borderColor:'rgb(196 196 196)'}}>
                <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" className='calendar' readOnlyInput hideOnRangeSelection maxDate={new Date()} />
                <i className='pi pi-calendar' style={{color:"#9ca3af"}}></i>
                </div>
                </div>


                <div className={classes.time}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ display: "flex", flexDirection: "column"}}>
      <label style={{ fontSize: "14px", fontWeight: "normal" }}>From Time</label>
      <MobileTimePicker
        value={time}
        onChange={(newValue) => setTime(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  </LocalizationProvider>-
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ display: "flex", flexDirection: "column"}}>
      <label style={{ fontSize: "14px", fontWeight: "normal",textAlign:'flex-end' }}>To Time</label>
      <MobileTimePicker
        value={toTime}
        onChange={(newValue) => setToTime(newValue)}
        renderInput={(params) => <TextField {...params} />}
        
      />
    </div>
  </LocalizationProvider>

                </div>
       
                {/* <div className="flex flex-col justify-center items-end">
<span  className="text-md font-thin">
                    MicroService
                </span>
                <div className="flex border border-gray-700 rounded-md p-1">
            <InputText value={service} placeholder="MicroService" onChange={(e) => setService(e.target.value)} />
            <i className='pi pi-compass' style={{color:"#9ca3af"}}></i>
            </div>
        </div> */}

        <div className={classes.header_avatar} onClick={dropdownHandler}>

       

          <img
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
            alt="Avatar"
            className={classes.avatar}
          />
          {showDropdown ? (
            <i class={`pi pi-angle-up ${classes.avatar_icon}`}></i>
          ) : (
            <i className={`pi pi-angle-down ${classes.avatar_icon}`}></i>
          )}
        </div>

        <div className={`${classes.dropdown} ${showDropdown && classes.show}`}>
          <div className={classes.dropdown_sub_container}>
            <div className={classes.user}>
              {/* <i className={`pi pi-user ${classes.user_icon}`}></i> */}
              <PersonIcon className={classes.user_icon}/>
              <p className={classes.dropdown_client_name}>{userName}</p>
            </div>

            <div className={classes.underline}></div>
            <button
              className={classes.logout_btn}
              onClick={() => {
                handleLogout();
              }}
            >
              <i className={`pi pi-sign-out ${classes.logout_icon}`}></i>
              Logout
            </button>
          </div>
        </div>
        </div>
      </header>
      {/* <NewMobileMenu highlight={highlight} mobileMenu={mobileMenu} hideMobileMenuHandler={hideMobileMenuHandler} /> */}
    </div>
  )
}

export default Header
