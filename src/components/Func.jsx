import React from "react";



function Func(props) {
      
    function handleClick() {
        props.funcClick(props.v);
        props.funcChange('');
    }
    
    function handleChange(e) {
        props.funcChange(e.target.value)  
    }

    function selectChange(e) {
        props.funcSelect(e.target.value)
    }



    return <div className="search-container">
        <input  name="query" className="search inp" value = {props.v} onChange = {handleChange} placeholder={props.q}/>
        <select value = {props.s} onChange = {selectChange} className="search select">
            <option>all</option>
            <option>photo</option>
            <option>illustration</option>
            <option>vector</option>
        </select>
        <button className="search btn" onClick={handleClick}>Search</button>
    </div>
}

export default Func;