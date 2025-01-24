import React,{useState,useEffect} from 'react';
import classes from './QueryForm.module.css'
import { InputText } from "primereact/inputtext";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import {  toast } from 'react-toastify';
import { ReactTyped } from "react-typed";


const QueryForm = () => {

    const [queryData,setQueryData] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    const [query,setQuery] = useState('')
    const [limit,setLimit] = useState('')
    const [manualQuery,setManualQuery] = useState(false);
    const [userQuery,setUserQuery] = useState('');
    // const [filters,setFilters] = useState([{id:'',filter:''}])
    const [filter, setFilter] = useState([
        {
            key:'',
            function:'',
            input:''
        }
    ]);
    const [sort,setSort] = useState({
        key:'',
        order:''
    })

    const functions=[
        {name:'like'},
        {name:'='},
        {name:'>='},
        {name:'<='},
        {name:'<'},
        {name:'>'},
    ]
    

    const [fields, setFields] = useState([
        { name: '@timestamp' },
        { name: '@message' },
        { name: 'request' },
        { name: 'Correlation Id' },
        { name: 'Method Id' },
        { name: 'stack' },
        { name: 'Cron Id' },
        { name: 'class' },
        { name: 'level' },
        { name: 'requestId' },
    ]);

    const orders=[
        {name:'asc'},
        {name:'desc'},
    ]


    // console.log(selectedFields)


    useEffect(() => {
        let generatedQuery = '';
    
        // Add selected fields to the query
        if (selectedFields.length > 0) {
            generatedQuery += `fields ${selectedFields.map(field => field.name).join(' ')}\n`;
        } else {
            generatedQuery += `fields {* }\n`;
        }
    
        // Add filter conditions
        let filterClauses = filter.map((item) => {
            if (item.key && item.function && item.input) {
                return `${item.key.name} ${item.function.name} '${item.input}'`;
            }
            return null;
        }).filter(Boolean);
    
        if (filterClauses.length > 0) {
            generatedQuery += `| filter ${filterClauses.join(' and ')}\n`;
        }
    
        // Add sorting
        if (sort.key && sort.order) {
            generatedQuery += `| sort ${sort.key.name} ${sort.order.name}\n`;
        }
    
        // Add limit
        if (limit) {
            generatedQuery += `| limit ${limit}`;
        }
    
        // Set the final query string
        setQuery(generatedQuery);
    }, [selectedFields, filter, sort, limit]);
    
    const [customField, setCustomField] = useState("");
const [showCustomInput, setShowCustomInput] = useState(false);

const handleCustomFieldChange = (e) => {
    setCustomField(e.target.value);
};

const addCustomField = () => {
    if (customField.trim() !== "") {
        setFields((prevFields) => [...prevFields, { name: customField.trim() }]);
        setCustomField("");
        setShowCustomInput(false);
    }
};
    
    


    const handleChangeFilter=(e,index)=>{
        // console.log(e.target)

        const {name,value} = e.target

        const updatedFilter = [...filter];
        updatedFilter[index] = {
            ...updatedFilter[index],
            [name]: value
        };
        setFilter(updatedFilter);
        
    }

    const handleChangeSort=(e)=>{
        console.log(e.target)

        setSort((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    console.log(filter,'chfgjvhj',filter?.length)
    const handleAddFilter = () => {
        if(filter[filter.length-1].key !== '' && filter[filter.length-1].value !== '' && filter[filter.length-1].input !== ''){
            setFilter([...filter, { key: '', function: '', input: '' }]);
        }
        else{
            toast.warn("Please First Fill the current filter values then you can add more filters!!")
        }
        
    };

    // const handlemanualQuery=()=>setManualQuery(!manualQuery)

    const handleCopy = () => {
        navigator.clipboard.writeText(query)
            .then(() => toast.success("Copied to clipboard!"))
            .catch(err => toast.error("Failed to copy!"));
    };    


  return (
    <div className={classes.container}>
    <div className={classes.sub_container1}>
    <p>Enter Your Queries to get Logs:</p>
    <div className={classes.multiSelect_fields}>
    <MultiSelect value={selectedFields} onChange={(e) => setSelectedFields(e.value)} options={fields} optionLabel="name" display="chip" 
                placeholder="Select Fields You want to show" maxSelectedLabels={selectedFields?.length} className="" className={classes.multiSelect} />
    </div>
    <div className={classes.inputs}>
    <div className={classes.filters_div}>
    
    <div className={classes.filters}>
   {
    
    filter.map((item,idx)=>(
        <div className={classes.filter} key={idx}>
        <span>Filter{idx !== 0  && idx+1} </span>
    <Dropdown value={item.key} onChange={(e)=>handleChangeFilter(e,idx)} options={fields} optionLabel="name" 
    name = "key"
                placeholder="Field" className=" filter-drop w-[5rem]" />
    <Dropdown value={item.function} onChange={(e)=>handleChangeFilter(e,idx)} options={functions} optionLabel="name" 
    name = "function"
                placeholder="function" className="filter-drop w-[2rem]" />
    <InputText value={item.input} name="input" type="text" onChange={(e)=>handleChangeFilter(e,idx)} className="p-inputtext-sm p-1" placeholder="input like" />
    </div>
    )) 
   }
   </div>
    <div className={classes.add_icon} onClick={handleAddFilter}>
    <i className='pi pi-plus'></i>
    </div>
    </div>
    <div className={classes.sort_div}>
    <p>Sort</p>
    <Dropdown
    value={sort.key}
    onChange={(e) => {
        if (e.value?.name === "Add Custom") {
            setShowCustomInput(true);
        } else {
            setSort((prev) => ({ ...prev, key: e.value }));
            setShowCustomInput(false);
        }
    }}
    options={[...fields, { name: "Add Custom" }]} // Add custom option
    optionLabel="name"
    placeholder="Field"
    className="filter-drop w-[5rem]"
/>

{showCustomInput && (
    <div style={{ display: "flex", gap: "5px" }}>
        <InputText
            value={customField}
            onChange={handleCustomFieldChange}
            placeholder="Enter new field"
            className="p-inputtext-sm w-[7rem]"
        />
        <button onClick={addCustomField} className="p-button p-button-sm w-[3rem] bg-black text-white flex items-center  text-center px-1">
            Add
        </button>
    </div>
)}

    <Dropdown value={sort.order} onChange={handleChangeSort} options={orders} optionLabel="name" 
    name = "order"
                placeholder="Order" className="filter-drop w-[4rem] " />
    </div>
    <div className={classes.limit_div}>
    <span>Limit</span>
    <InputText type="text" className="p-inputtext-sm p-1" value={limit} onChange={(e)=>setLimit(e.target.value)} className={classes.input_limit} placeholder="100" />
    </div>
    </div>
    </div>
    <div className={classes.sub_container2}>
    <div className={classes.btns}>
        <button className={`${classes.btn} ${!manualQuery && classes.active_btn}`} onClick={()=>setManualQuery(false)} >Your Query</button>
        <button className={`${classes.btn} ${manualQuery && classes.active_btn}`} onClick={()=>setManualQuery(true)} >Enter Manually</button>
    </div>
    {
        !manualQuery ? 
        <div className={classes.your_query_div}>
    <p>Your Query:</p>
    <i className={`pi pi-copy ${classes.copy_icon}` } onClick={handleCopy}></i>
    <InputTextarea autoResize value={query} readOnly  rows={7} cols={30} className={classes.query_area} />
    </div>
    :
    <>
    <p>Enter Your Query:</p>
    <ReactTyped
    attr="placeholder"
    strings={[
                "fields request @message",
                "filter @message like 'type some message here'",
                "sort @timestamp asc",
                "limit 100"
            ]}
    typeSpeed={40}
    backSpeed={20}
    loop
>
    <InputTextarea 
        autoResize 
        value={userQuery} 
        onChange={(e) => setUserQuery(e.target.value)} 
        rows={7} 
        cols={30} 
        className={classes.input_textarea} // Optional: Add CSS styling if needed
    />
</ReactTyped>
    </>
    }
    </div>
    </div>
  );
}

export default QueryForm;
