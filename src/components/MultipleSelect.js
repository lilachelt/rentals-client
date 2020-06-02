import React from 'react';

const MultipleSelect = (props) => {

    const handleChange = (e) =>{
        let value = [].slice.call(e.target.selectedOptions).map(o => {
            return o.value;
        });
         props.multiSelect(e.target.name,value);
    } 
    return (
        <select 
            className="custom-select" 
            onChange={handleChange}
            name={props.name}
            multiple
            value={props.selected}>
                {props.options.map((value,key) => 
                    <option key={key} value={value.key}>{value.value}</option>)}
        </select>

    );

}

export default MultipleSelect;