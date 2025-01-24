import React,{useState} from 'react'
import classes from './Sidebar.module.css'
import logo from '../Assets/logo.jpg'
import { Tree } from 'primereact/tree';
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';



const SideBar = ({sidebarHide,sidebarHandler}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const [expand,setExpand] = useState({id:'',value:false})

  const items = [
    { name: 'svc1' },
    { name: 'service2' },
    { name: 'servihbjndfghjce3' },
  ];

  console.log(selectedItems,'selected items')

  const [sidebarData,setSideBarData] = useState([{
    item:"Services",
    children: items
  },
  {
    item:"Documents",
    children: []
  }
]);
console.log(expand)

const handleExpand=(id)=>{
  setExpand((prev)=>({
    ...prev,
   id :id,
    value: !prev.value
  }))
  
}


  return (
    <div className={`${classes.sidebar} ${sidebarHide && classes.short}`}>
    <div className={`${classes.sidebar_header} ${sidebarHide && classes.short}`}>
      <img
        src={logo}
        alt="Revenue portal"
        className={classes.sidebar_logo}
      />  
      <hr  style={{color:'grey',width:"90%",fontSize:'1.25rem'}}/>
      {/* <h3 className={classes.dashboard_text}>Dashboard</h3> */}
    </div>
    <div className={classes.sidebar_icon}>
      {/* <div className={classes.circle} onClick={sidebarHandler}>
        {sidebarHide ? (
          <i className={`pi pi-angle-left ${classes.arrow_icon}`}></i>
        ) : (
          <i className={`pi pi-angle-left ${classes.arrow_icon}`}></i>
        )}
      </div> */}
    </div>
   
  



    <div className={classes.sidebar_container}>
    <div className={classes.sidebar_sub_container}>
    {
      sidebarData?.map((data,idx)=>{
        {console.log(data.children)}
        return (
        <div className='w-[80%]'>
        <p className='flex items-center gap-2 w-[80%] text-xl'> <i className={`${expand.id == idx && expand?.value ? 'pi pi-caret-down' : 'pi pi-caret-right' }`} style={{cursor:'pointer'}} onClick={()=>handleExpand(idx)}></i> <span >{data.item}</span></p>
        {
          expand.value && expand.id == idx &&
          <div className='border border-gray-100 rounded-md w-[90%] ml-5 mt-1'>
          <MultiSelect value={selectedItems} onChange={(e) => setSelectedItems(e.value)} options={items} optionLabel="name" display="chip" 
                placeholder="Select Services" maxSelectedLabels={3} className="multiselect-col w-full md:w-20rem"  />
          </div>
        }
        </div>
      )
      })
    }
    </div>
      {/* <div className={classes.sidebar_sub_container}> 
      <div className={classes.tab} style={{color:"#953333"}}>
              <i className='pi pi-user'></i>
              <span className={`${sidebarHide && classes.short_item}`}  >
                Service
              </span>
              
            </div>

            <div className={classes.tab}>
              <i className='pi pi-user'></i>
              <span className={`${sidebarHide && classes.short_item}`}>
                Pages
              </span>
              
            </div>
            <div
              className={classes.tab}
            >
              <i className='pi pi-user'></i>
              <span className={`${sidebarHide && classes.short_item}`}>
                Dashboard
              </span>
              
            </div>
            <div
              className={classes.tab}
            >
              <i className='pi pi-user'></i>
              <span className={`${sidebarHide && classes.short_item}`}>
                Monthly Logs
              </span>
              
            </div>
          
      </div> */}
    </div>
   
</div>

  )
}

export default SideBar
